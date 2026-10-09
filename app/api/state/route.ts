import { and, desc, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { getChatGPTUser } from "../../chatgpt-auth";
import { getDb } from "../../../db";
import { customCards, profiles, reviewCards, studyDays } from "../../../db/schema";

const json = (value: unknown, status = 200) => Response.json(value, { status });
const safeParse = <T,>(value: string, fallback: T): T => {
  try { return JSON.parse(value) as T; } catch { return fallback; }
};

const VISITOR_COOKIE = "english_quest_visitor";
const levels = new Set(["A1", "A2", "B1", "B2", "C1"]);
const goals = new Set(["conversation", "entertainment", "career", "travel", "exam"]);
const interests = new Set([
  "games", "anime", "cartoons", "movies", "series", "books", "music", "sports", "travel",
  "tech", "science", "history", "food", "fitness", "work", "study", "news", "daily",
]);

async function identity() {
  const user = await getChatGPTUser();
  if (user) return { id: user.userId, name: user.fullName?.split(" ")[0] ?? user.displayName };

  const cookieStore = await cookies();
  const savedVisitor = cookieStore.get(VISITOR_COOKIE)?.value;
  const visitorId = savedVisitor && /^[a-f0-9-]{36}$/i.test(savedVisitor) ? savedVisitor : crypto.randomUUID();
  if (savedVisitor !== visitorId) {
    cookieStore.set(VISITOR_COOKIE, visitorId, {
      httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 365,
    });
  }
  return { id: `visitor:${visitorId}`, name: "Estudante" };
}

export async function GET() {
  try {
    const user = await identity();
    const db = getDb();
    const [profile] = await db.select().from(profiles).where(eq(profiles.userId, user.id)).limit(1);
    const days = await db.select().from(studyDays).where(eq(studyDays.userId, user.id)).orderBy(desc(studyDays.studyDate)).limit(60);
    const reviews = await db.select().from(reviewCards).where(eq(reviewCards.userId, user.id)).limit(500);
    const personalCards = await db.select().from(customCards).where(eq(customCards.userId, user.id)).orderBy(desc(customCards.createdAt)).limit(250);
    return json({
      user,
      profile: profile ? { ...profile, interests: safeParse<string[]>(profile.interests, []) } : null,
      days: days.map((day) => ({ ...day, tasksCompleted: safeParse<string[]>(day.tasksCompleted, []) })),
      reviews,
      customCards: personalCards.map(({ id, deck, front, back, example }) => ({ id, deck, front, back, example })),
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Não foi possível carregar seu progresso." }, 500);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const user = await identity();
    const db = getDb();
    const now = new Date().toISOString();

    if (body.action === "saveProfile") {
      const selectedInterests = Array.isArray(body.interests)
        ? body.interests.filter((item): item is string => typeof item === "string" && interests.has(item))
        : [];
      const requestedLevel = String(body.level || "A2");
      const requestedGoal = String(body.goal || "conversation");
      const requestedMinutes = Number(body.dailyMinutes);
      const values = {
        userId: user.id,
        displayName: String(body.displayName || user.name),
        level: levels.has(requestedLevel) ? requestedLevel : "A2",
        goal: goals.has(requestedGoal) ? requestedGoal : "conversation",
        dailyMinutes: [15, 30, 45, 60].includes(requestedMinutes) ? requestedMinutes : 30,
        interests: JSON.stringify(selectedInterests),
        onboardingComplete: true,
        updatedAt: now,
      };
      await db.insert(profiles).values(values).onConflictDoUpdate({ target: profiles.userId, set: values });
      return json({ ok: true, profile: { ...values, interests: selectedInterests } });
    }

    if (body.action === "toggleTask") {
      const date = String(body.date || "");
      const taskId = String(body.taskId || "");
      const completed = Boolean(body.completed);
      const taskMinutes = Math.max(0, Number(body.minutes) || 0);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !taskId) return json({ error: "Dados da tarefa inválidos." }, 400);
      const [current] = await db.select().from(studyDays).where(and(eq(studyDays.userId, user.id), eq(studyDays.studyDate, date))).limit(1);
      const tasks = new Set(current ? safeParse<string[]>(current.tasksCompleted, []) : []);
      if (completed) tasks.add(taskId);
      else tasks.delete(taskId);
      const minutes = Math.max(0, (current?.minutes ?? 0) + (completed ? taskMinutes : -taskMinutes));
      if (current) {
        await db.update(studyDays).set({ tasksCompleted: JSON.stringify([...tasks]), minutes, updatedAt: now }).where(eq(studyDays.id, current.id));
      } else {
        await db.insert(studyDays).values({ userId: user.id, studyDate: date, tasksCompleted: JSON.stringify([...tasks]), minutes, updatedAt: now });
      }
      return json({ ok: true, day: { studyDate: date, tasksCompleted: [...tasks], minutes } });
    }

    if (body.action === "reviewCard") {
      const cardId = String(body.cardId || "");
      const rating = Math.min(4, Math.max(1, Number(body.rating) || 3));
      if (!cardId) return json({ error: "Cartão inválido." }, 400);
      const [current] = await db.select().from(reviewCards).where(and(eq(reviewCards.userId, user.id), eq(reviewCards.cardId, cardId))).limit(1);
      const repetitions = rating === 1 ? 0 : (current?.repetitions ?? 0) + 1;
      const previous = current?.intervalDays ?? 0;
      const intervalDays = rating === 1 ? 0 : rating === 2 ? Math.max(1, Math.round(previous * 1.2) || 1) : rating === 3 ? Math.max(2, Math.round(previous * 2.2) || 2) : Math.max(4, Math.round(previous * 3.2) || 4);
      const ease = Math.min(300, Math.max(130, (current?.ease ?? 250) + (rating - 3) * 15));
      const due = new Date();
      due.setUTCDate(due.getUTCDate() + intervalDays);
      const values = { userId: user.id, cardId, repetitions, intervalDays, ease, dueDate: due.toISOString().slice(0, 10), updatedAt: now };
      await db.insert(reviewCards).values(values).onConflictDoUpdate({ target: [reviewCards.userId, reviewCards.cardId], set: values });
      return json({ ok: true, review: values });
    }

    if (body.action === "addCustomCard") {
      const front = String(body.front || "").trim();
      const back = String(body.back || "").trim();
      const example = String(body.example || "").trim();
      if (!front || !back) return json({ error: "Preencha a expressão e o significado." }, 400);
      if (front.length > 120 || back.length > 220 || example.length > 300) return json({ error: "O cartão ficou longo demais." }, 400);
      const card = { id: `custom:${crypto.randomUUID()}`, userId: user.id, deck: "personal", front, back, example, createdAt: now, updatedAt: now };
      await db.insert(customCards).values(card);
      return json({ ok: true, card: { id: card.id, deck: card.deck, front, back, example } });
    }

    if (body.action === "deleteCustomCard") {
      const cardId = String(body.cardId || "");
      if (!cardId.startsWith("custom:")) return json({ error: "Cartão inválido." }, 400);
      await db.delete(customCards).where(and(eq(customCards.id, cardId), eq(customCards.userId, user.id)));
      await db.delete(reviewCards).where(and(eq(reviewCards.cardId, cardId), eq(reviewCards.userId, user.id)));
      return json({ ok: true, cardId });
    }
    return json({ error: "Ação inválida." }, 400);
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Não foi possível salvar." }, 500);
  }
}
