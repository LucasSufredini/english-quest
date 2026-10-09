"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BarChart3, BookOpen, Brain, Briefcase, Check, ChevronRight, CircleUserRound, Clock3,
  Compass, CookingPot, Dumbbell, ExternalLink, Flame, FlaskConical, Gamepad2, GraduationCap,
  Headphones, History, Home, Layers3, Library, Lightbulb, MessageCircle, Music, Newspaper,
  Pause, Pencil, Plane, Play, Plus, RotateCcw, Search, Settings2, Smile, Sparkles,
  Target, TimerReset, Trash2, Trophy, Volume2, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  buildDailyReviewQueue, cards, diagnosticQuestions, flashcardDecks, interestLabels, levelCopy, makePlan, pickResources,
  practicalGuides, researchSources, resources, stableHash, stories, type Interest, type Level,
  type Flashcard, type Resource, type Story, type StudyTask,
} from "@/lib/study-data";

type Profile = {
  displayName: string; level: Level; goal: string; dailyMinutes: number;
  interests: Interest[]; onboardingComplete: boolean;
};
type StudyDay = { studyDate: string; minutes: number; tasksCompleted: string[] };
type Review = { cardId: string; dueDate: string; intervalDays: number };
type ApiState = { user: { id: string; name: string }; profile: Profile | null; days: StudyDay[]; reviews: Review[]; customCards: Flashcard[] };
type View = "today" | "plan" | "library" | "review" | "progress" | "method";

const views: { id: View; label: string; icon: typeof Home }[] = [
  { id: "today", label: "Hoje", icon: Home },
  { id: "plan", label: "Meu plano", icon: Target },
  { id: "library", label: "Explorar", icon: Library },
  { id: "review", label: "Revisar", icon: Brain },
  { id: "progress", label: "Progresso", icon: BarChart3 },
  { id: "method", label: "Método", icon: Compass },
];

const goals: Record<string, string> = {
  conversation: "Conversar com confiança", entertainment: "Entender conteúdo sem depender de legenda",
  career: "Usar inglês na carreira", travel: "Viajar e me comunicar", exam: "Preparar uma prova",
};

const localDate = (date = new Date()) => new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit",
}).format(date);

const formatLongDate = (date = new Date()) => new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo", weekday: "long", day: "numeric", month: "long",
}).format(date);

const formatTime = (date = new Date()) => new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
}).format(date);

function greetingFor(date = new Date()) {
  const hour = Number(new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo", hour: "2-digit", hourCycle: "h23",
  }).format(date));
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

function dateMinus(days: number) {
  const d = new Date(); d.setDate(d.getDate() - days); return localDate(d);
}

export default function EnglishQuest() {
  const [active, setActive] = useState<View>("today");
  const [now, setNow] = useState(() => new Date());
  const [data, setData] = useState<ApiState>({ user: { id: "", name: "Estudante" }, profile: null, days: [], reviews: [], customCards: [] });
  const [loading, setLoading] = useState(true);
  const [setupOpen, setSetupOpen] = useState(false);
  const [setupStep, setSetupStep] = useState(0);
  const [draft, setDraft] = useState<Profile>({ displayName: "Estudante", level: "A2", goal: "conversation", dailyMinutes: 30, interests: ["games", "anime", "movies", "series"], onboardingComplete: true });
  const [saving, setSaving] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [sessionTask, setSessionTask] = useState<StudyTask | null>(null);

  useEffect(() => {
    fetch("/api/state").then(async (response) => {
      if (!response.ok) throw new Error("state");
      return response.json() as Promise<ApiState>;
    }).then((state) => {
      setData(state);
      if (state.profile) setDraft(state.profile);
      else setDraft((current) => ({ ...current, displayName: state.user.name || "Estudante" }));
      setSetupOpen(!state.profile);
    }).catch(() => setSetupOpen(true)).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const clock = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(clock);
  }, []);

  useEffect(() => {
    const handler = (event: Event) => setToast((event as CustomEvent<string>).detail);
    window.addEventListener("eq-toast", handler);
    return () => window.removeEventListener("eq-toast", handler);
  }, []);

  const profile = data.profile ?? draft;
  const today = localDate(now);
  const todayReviewCount = useMemo(
    () => buildDailyReviewQueue([...data.customCards, ...cards], data.reviews, today, 10).length,
    [data.customCards, data.reviews, today],
  );
  const plan = useMemo(
    () => makePlan(profile.level, profile.dailyMinutes, profile.interests, today, data.user.id, profile.goal, todayReviewCount),
    [data.user.id, profile, today, todayReviewCount],
  );
  const todayData = data.days.find((day) => day.studyDate === today) ?? { studyDate: today, minutes: 0, tasksCompleted: [] };
  const completed = todayData.tasksCompleted.length;
  const completion = Math.round((completed / plan.length) * 100);
  const nextTask = plan.find((task) => !todayData.tasksCompleted.includes(task.id));
  const studiedDates = useMemo(() => new Set(data.days.filter((d) => d.minutes > 0).map((d) => d.studyDate)), [data.days]);
  const streak = useMemo(() => {
    let count = 0;
    for (let i = 0; i < 365; i += 1) {
      if (!studiedDates.has(dateMinus(i))) break;
      count += 1;
    }
    return count;
  }, [studiedDates]);

  const post = useCallback(async (payload: Record<string, unknown>) => {
    const response = await fetch("/api/state", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
    if (!response.ok) throw new Error("save");
    return response.json();
  }, []);

  const toggleTask = useCallback(async (task: StudyTask, checked: boolean) => {
    if (saving) return;
    setSaving(task.id);
    const previous = data.days;
    const current = previous.find((day) => day.studyDate === today) ?? { studyDate: today, minutes: 0, tasksCompleted: [] };
    const ids = checked ? [...new Set([...current.tasksCompleted, task.id])] : current.tasksCompleted.filter((id) => id !== task.id);
    const nextDay = { ...current, tasksCompleted: ids, minutes: Math.max(0, current.minutes + (checked ? task.minutes : -task.minutes)) };
    setData((state) => ({ ...state, days: [nextDay, ...state.days.filter((day) => day.studyDate !== today)] }));
    try {
      await post({ action: "toggleTask", date: today, taskId: task.id, minutes: task.minutes, completed: checked });
      setToast(checked ? "Tarefa concluída. Bom trabalho!" : "Tarefa reaberta.");
    } catch {
      setData((state) => ({ ...state, days: previous }));
      setToast("Não foi possível salvar agora.");
    } finally { setSaving(null); }
  }, [data.days, post, saving, today]);

  async function saveProfile() {
    if (draft.interests.length === 0) return setToast("Escolha pelo menos um interesse.");
    setSaving("profile");
    try {
      await post({ action: "saveProfile", ...draft });
      setData((state) => ({ ...state, profile: draft }));
      setSetupOpen(false); setSetupStep(0); setToast("Seu plano foi personalizado.");
    } catch { setToast("Não foi possível salvar seu perfil."); }
    finally { setSaving(null); }
  }

  useEffect(() => {
    const context = (document as Document & { modelContext?: { registerTool?: (tool: unknown, options?: { signal: AbortSignal }) => void | Promise<void> } }).modelContext;
    if (!context?.registerTool || !nextTask) return;
    const controller = new AbortController();
    try {
      void Promise.resolve(context.registerTool({
        name: "complete_next_study_task", title: "Concluir próxima tarefa",
        description: "Marca como concluída a próxima tarefa visível do plano de inglês de hoje.",
        inputSchema: { type: "object", properties: {}, additionalProperties: false },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute: async () => { await toggleTask(nextTask, true); return { completed: nextTask.title, date: today }; },
      }, { signal: controller.signal })).catch(() => undefined);
    } catch { /* Navegador sem suporte ao WebMCP. */ }
    return () => controller.abort();
  }, [nextTask, today, toggleTask]);

  return (
    <Tabs value={active} onValueChange={(value) => setActive(value as View)} className="eq-shell">
      <Sidebar profile={profile} completion={completion} onEdit={() => setSetupOpen(true)} />
      <main className="eq-main">
        <header className="eq-topbar">
          <div>
            <p className="eyebrow">{formatLongDate(now)} · {formatTime(now)}</p>
            <h1>{active === "today" ? `${greetingFor(now)}, ${profile.displayName.split(" ")[0]}` : views.find((view) => view.id === active)?.label}</h1>
          </div>
          <div className="top-actions">
            <span className="level-pill"><span>{profile.level}</span>{levelCopy[profile.level].label}</span>
            <Button variant="outline" className="icon-btn" aria-label="Editar perfil" onClick={() => setSetupOpen(true)}><Settings2 /></Button>
          </div>
        </header>

        {loading ? <LoadingView /> : (
          <>
            <TabsContent value="today"><TodayView profile={profile} visitorSeed={data.user.id} plan={plan} todayData={todayData} completion={completion} nextTask={nextTask} streak={streak} studiedDates={studiedDates} onToggle={toggleTask} saving={saving} setActive={setActive} onStart={setSessionTask} /></TabsContent>
            <TabsContent value="plan"><PlanView profile={profile} plan={plan} todayData={todayData} onToggle={toggleTask} saving={saving} onStart={setSessionTask} /></TabsContent>
            <TabsContent value="library"><LibraryView profile={profile} /></TabsContent>
            <TabsContent value="review"><ReviewView reviews={data.reviews} customCards={data.customCards} post={post} setToast={setToast} onReviewUpdated={(review) => setData((state) => ({ ...state, reviews: [review, ...state.reviews.filter((item) => item.cardId !== review.cardId)] }))} onCustomCardAdded={(card) => setData((state) => ({ ...state, customCards: [card, ...state.customCards] }))} onCustomCardDeleted={(cardId) => setData((state) => ({ ...state, customCards: state.customCards.filter((card) => card.id !== cardId), reviews: state.reviews.filter((review) => review.cardId !== cardId) }))} /></TabsContent>
            <TabsContent value="progress"><ProgressView days={data.days} streak={streak} profile={profile} /></TabsContent>
            <TabsContent value="method"><MethodView level={profile.level} /></TabsContent>
          </>
        )}
      </main>
      <MobileNav />
      <SetupDialog open={setupOpen} setOpen={setSetupOpen} step={setupStep} setStep={setSetupStep} draft={draft} setDraft={setDraft} required={!data.profile} onSave={saveProfile} saving={saving === "profile"} />
      <FocusSession key={sessionTask?.id ?? "closed"} task={sessionTask} onClose={() => setSessionTask(null)} onComplete={async (task) => { await toggleTask(task, true); setSessionTask(null); }} onNavigate={(view) => { setActive(view); setSessionTask(null); }} />
      {toast && <div className="eq-toast"><Check />{toast}</div>}
    </Tabs>
  );
}

function Sidebar({ profile, completion, onEdit }: { profile: Profile; completion: number; onEdit: () => void }) {
  return <aside className="eq-sidebar">
    <div className="brand"><span className="brand-mark"><MessageCircle /></span><div><strong>English Quest</strong><small>LEARN FOR REAL</small></div></div>
    <TabsList className="side-nav">
      {views.map(({ id, label, icon: Icon }) => <TabsTrigger key={id} value={id}><Icon />{label}</TabsTrigger>)}
    </TabsList>
    <div className="side-card">
      <div className="side-card-head"><span>Meta diária</span><b>{completion}%</b></div>
      <Progress value={completion} />
      <p>{profile.dailyMinutes} minutos · {profile.level}</p>
    </div>
    <button className="profile-mini" onClick={onEdit}><span className="avatar">{profile.displayName.charAt(0)}</span><span><b>{profile.displayName}</b><small>{goals[profile.goal]}</small></span><Pencil /></button>
  </aside>;
}

function MobileNav() {
  return <TabsList className="mobile-nav">{views.map(({ id, label, icon: Icon }) => <TabsTrigger key={id} value={id}><Icon /><span>{label}</span></TabsTrigger>)}</TabsList>;
}

function TodayView({ profile, visitorSeed, plan, todayData, completion, nextTask, streak, studiedDates, onToggle, saving, setActive, onStart }: {
  profile: Profile; visitorSeed: string; plan: StudyTask[]; todayData: StudyDay; completion: number; nextTask?: StudyTask; streak: number;
  studiedDates: Set<string>; onToggle: (task: StudyTask, checked: boolean) => void; saving: string | null; setActive: (view: View) => void; onStart: (task: StudyTask) => void;
}) {
  const matching = pickResources(profile.level, profile.interests, `${visitorSeed}:${todayData.studyDate}`, 3);
  return <div className="view-stack">
    <section className="today-hero">
      <div className="hero-copy">
        <span className="eyebrow cyan">MISSÃO DE HOJE</span>
        <h2>{nextTask ? nextTask.title : "Plano concluído!"}</h2>
        <p>{nextTask ? nextTask.instruction : "Você fechou o ciclo de input, memória, pronúncia e produção. Volte amanhã para avançar."}</p>
        {nextTask ? <div className="hero-actions"><Button className="primary-cta" onClick={() => onStart(nextTask)}><Play />Começar agora</Button><span><Clock3 />{nextTask.minutes} min</span></div> : <div className="hero-actions"><Trophy /> Excelente consistência.</div>}
      </div>
      <div className="progress-orbit" style={{ "--progress": `${completion * 3.6}deg` } as React.CSSProperties}><div><strong>{completion}%</strong><span>{todayData.minutes}/{profile.dailyMinutes} min</span></div></div>
    </section>

    <div className="dashboard-grid">
      <section className="panel task-panel">
        <PanelHead title="Plano de hoje" subtitle="Um ciclo completo, sem estudo aleatório" action={`${todayData.tasksCompleted.length}/${plan.length}`} />
        <div className="task-list">{plan.map((task, index) => <TaskRow key={task.id} task={task} index={index} checked={todayData.tasksCompleted.includes(task.id)} onToggle={onToggle} onStart={onStart} disabled={saving === task.id} />)}</div>
      </section>
      <aside className="dashboard-side">
        <section className="panel streak-card"><div className="streak-number"><span><Flame /></span><div><strong>{streak}</strong><small>dias seguidos</small></div></div><HeatStrip dates={studiedDates} /><p>Consistência vence intensidade. Se o dia apertar, faça só 15 minutos.</p></section>
        <section className="panel focus-card"><Sparkles /><div><span>FOCO DO NÍVEL {profile.level}</span><h3>{levelCopy[profile.level].focus}</h3><p>{levelCopy[profile.level].canDo}</p></div></section>
      </aside>
    </div>

    <section className="recommend-section"><PanelHead title="Escolhidos para você" subtitle={`Conteúdo ${profile.level} com ${profile.interests.slice(0, 2).map((i) => interestLabels[i]).join(" e ")}`} actionButton="Ver biblioteca" onAction={() => setActive("library")} /><div className="resource-grid compact">{matching.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}</div></section>
  </div>;
}

function TaskRow({ task, index, checked, onToggle, onStart, disabled }: { task: StudyTask; index: number; checked: boolean; onToggle: (task: StudyTask, checked: boolean) => void; onStart: (task: StudyTask) => void; disabled: boolean }) {
  const icons = [Headphones, Brain, Volume2, MessageCircle]; const Icon = icons[index] ?? BookOpen;
  return <div className={`task-row ${checked ? "done" : ""}`}>
    <div className="task-index"><Icon /></div>
    <div className="task-copy"><span>{task.skill}</span><h3>{task.title}</h3><p>{task.meta}</p></div>
    <span className="task-time">{task.minutes} min</span>
    {!checked ? <button className="task-open" onClick={() => onStart(task)} aria-label={`Iniciar ${task.title}`}><Play /></button> : null}
    <Checkbox checked={checked} disabled={disabled} onCheckedChange={(value) => onToggle(task, value === true)} aria-label={`Marcar ${task.title} como concluída`} />
  </div>;
}

function PlanView({ profile, plan, todayData, onToggle, saving, onStart }: { profile: Profile; plan: StudyTask[]; todayData: StudyDay; onToggle: (task: StudyTask, checked: boolean) => void; saving: string | null; onStart: (task: StudyTask) => void }) {
  return <div className="view-stack">
    <section className="plan-intro panel"><div><span className="eyebrow cyan">SEU SISTEMA</span><h2>{profile.dailyMinutes} minutos com começo, meio e fim</h2><p>O plano não tenta ensinar tudo de uma vez. Ele cria contato compreensível, força a memória a trabalhar e termina com uso real do idioma.</p></div><div className="plan-formula"><span>INPUT</span><i>+</i><span>RECUPERAR</span><i>+</i><span>FALAR</span><i>+</i><span>CRIAR</span></div></section>
    <section className="panel"><PanelHead title="Sessão de hoje" subtitle={`${goals[profile.goal]} · nível ${profile.level}`} action={`${todayData.minutes}/${profile.dailyMinutes} min`} /><div className="expanded-tasks">{plan.map((task, index) => <div className={`expanded-task ${todayData.tasksCompleted.includes(task.id) ? "done" : ""}`} key={task.id}><div className="step-line"><span>{String(index + 1).padStart(2,"0")}</span></div><div><span className="eyebrow">{task.skill} · {task.minutes} MIN</span><h3>{task.title}</h3><p>{task.instruction}</p>{!todayData.tasksCompleted.includes(task.id) && <button className="session-link" onClick={() => onStart(task)}><Play />Iniciar sessão guiada</button>}</div><Checkbox checked={todayData.tasksCompleted.includes(task.id)} disabled={saving === task.id} onCheckedChange={(value) => onToggle(task, value === true)} /></div>)}</div></section>
    <section className="week-map"><div><span>SEG</span><b>Input + frases</b></div><div><span>TER</span><b>Escuta + fala</b></div><div><span>QUA</span><b>Leitura + resumo</b></div><div><span>QUI</span><b>Escuta + escrita</b></div><div><span>SEX</span><b>Conteúdo livre</b></div><div><span>SÁB</span><b>Projeto semanal</b></div><div><span>DOM</span><b>Revisão leve</b></div></section>
  </div>;
}

function LibraryView({ profile }: { profile: Profile }) {
  const [section, setSection] = useState<"materials" | "stories">("materials");
  const [query, setQuery] = useState(""); const [type, setType] = useState("Todos"); const [personal, setPersonal] = useState(true);
  const [story, setStory] = useState<Story | null>(null);
  const types = ["Todos", "Vídeo", "Podcast", "Livro", "Prática", "Curso"];
  const filtered = resources.filter((resource) => (type === "Todos" || resource.type === type) && (!personal || resource.levels.includes(profile.level)) && (!personal || resource.interests.some((i) => profile.interests.includes(i))) && `${resource.title} ${resource.creator} ${resource.description}`.toLowerCase().includes(query.toLowerCase()));
  const visibleStories = stories.filter((item) => !personal || item.level === profile.level || Math.abs((["A1","A2","B1","B2","C1"] as Level[]).indexOf(item.level) - (["A1","A2","B1","B2","C1"] as Level[]).indexOf(profile.level)) <= 1);
  return <div className="view-stack">
    <div className="library-sections"><button className={section === "materials" ? "active" : ""} onClick={() => setSection("materials")}><Library />Materiais externos<span>{resources.length}</span></button><button className={section === "stories" ? "active" : ""} onClick={() => setSection("stories")}><BookOpen />Histórias graduadas<span>{stories.length}</span></button></div>
    {section === "materials" ? <>
      <section className="library-controls"><div className="search-box"><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar livro, podcast, canal ou habilidade..." /></div><button className={`smart-filter ${personal ? "active" : ""}`} onClick={() => setPersonal(!personal)}><Sparkles />Para meu nível</button></section>
      <div className="filter-row">{types.map((item) => <button className={type === item ? "active" : ""} key={item} onClick={() => setType(item)}>{item}</button>)}</div>
      <div className="library-summary"><div><span className="eyebrow cyan">BIBLIOTECA CURADA</span><h2>{filtered.length} recursos para estudar de verdade</h2></div><p>Use a regra: entenda a ideia geral e a maior parte das palavras. Se precisar pausar em toda frase, escolha algo mais fácil.</p></div>
      <div className="resource-grid">{filtered.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}</div>
      {filtered.length === 0 && <div className="empty-state"><Search /><h3>Nenhum recurso encontrado</h3><p>Tire um filtro ou busque outra palavra.</p></div>}
    </> : <>
      <div className="library-summary"><div><span className="eyebrow cyan">LEIA DENTRO DA PLATAFORMA</span><h2>Histórias do A1 ao C1</h2></div><p>Textos originais com vocabulário-chave e pergunta de compreensão. Leia sem traduzir tudo e tente responder antes de revelar.</p></div>
      <div className="story-grid">{visibleStories.map((item) => <StoryCard key={item.id} story={item} onOpen={() => setStory(item)} />)}</div>
      <button className={`smart-filter story-level-toggle ${personal ? "active" : ""}`} onClick={() => setPersonal(!personal)}><Sparkles />{personal ? `Mostrando perto do ${profile.level}` : "Mostrar todos os níveis"}</button>
    </>}
    <StoryReader key={story?.id ?? "closed"} story={story} onClose={() => setStory(null)} />
  </div>;
}

function StoryCard({ story, onOpen }: { story: Story; onOpen: () => void }) {
  return <button className="story-card" onClick={onOpen}><div className="story-cover"><span>{story.level}</span><BookOpen /><small>{story.genre}</small></div><div><span className="eyebrow">{story.minutes} MIN · {story.genre}</span><h3>{story.title}</h3><p>{story.summary}</p><b>Ler agora<ChevronRight /></b></div></button>;
}

function StoryReader({ story, onClose }: { story: Story | null; onClose: () => void }) {
  const [answer, setAnswer] = useState(false);
  const [listening, setListening] = useState(false);

  useEffect(() => () => { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); }, []);

  function listen() {
    if (!story || !("speechSynthesis" in window)) return;
    if (listening) { window.speechSynthesis.cancel(); setListening(false); return; }
    const utterance = new SpeechSynthesisUtterance(`${story.title}. ${story.paragraphs.join(" ")}`);
    utterance.lang = "en-US";
    utterance.rate = story.level === "A1" || story.level === "A2" ? .78 : .88;
    utterance.onend = () => setListening(false);
    utterance.onerror = () => setListening(false);
    setListening(true);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  return <Dialog open={!!story} onOpenChange={(open) => { if (!open) { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); onClose(); } }}><DialogContent className="story-dialog"><DialogHeader><div className="story-reader-meta"><span>{story?.level}</span><span>{story?.genre}</span><span>{story?.minutes} min</span></div><DialogTitle>{story?.title}</DialogTitle><DialogDescription>{story?.summary}</DialogDescription>{story && <button className={`story-listen ${listening ? "active" : ""}`} onClick={listen}>{listening ? <Pause /> : <Volume2 />}{listening ? "Parar áudio" : "Ouvir história em inglês"}</button>}</DialogHeader>{story && <div className="story-reader"><article>{story.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</article><aside><div><span className="eyebrow cyan">VOCABULÁRIO</span>{story.vocabulary.map((item) => <p key={item.word}><b>{item.word}</b><small>{item.meaning}</small></p>)}</div><div className="story-question"><span className="eyebrow">COMPREENSÃO</span><h4>{story.question}</h4>{answer ? <p>{story.answer}</p> : <Button variant="outline" onClick={() => setAnswer(true)}>Revelar resposta</Button>}</div></aside></div>}</DialogContent></Dialog>;
}

function ResourceCard({ resource }: { resource: Resource }) {
  const Icon = resource.type === "Livro" ? BookOpen : resource.type === "Podcast" ? Headphones : resource.type === "Prática" ? Brain : Play;
  return <a className="resource-card" href={resource.url} target="_blank" rel="noreferrer"><div className={`resource-icon type-${resource.type.toLowerCase().replace("á","a")}`}><Icon /></div><div className="resource-tags"><span>{resource.type}</span><span>{resource.levels[0]}–{resource.levels.at(-1)}</span>{resource.free && <span>GRÁTIS</span>}</div><h3>{resource.title}</h3><b>{resource.creator}</b><p>{resource.description}</p><div className="resource-footer"><span><Clock3 />{resource.duration}</span><span>Abrir<ExternalLink /></span></div></a>;
}

function ReviewView({ reviews, customCards, post, setToast, onReviewUpdated, onCustomCardAdded, onCustomCardDeleted }: {
  reviews: Review[]; customCards: Flashcard[]; post: (payload: Record<string, unknown>) => Promise<unknown>;
  setToast: (value: string) => void; onReviewUpdated: (review: Review) => void;
  onCustomCardAdded: (card: Flashcard) => void; onCustomCardDeleted: (cardId: string) => void;
}) {
  const dailyDeck = { id:"daily", title:"Sessão de hoje", description:"Revisões vencidas + até 10 cartões novos", color:"cyan" };
  const reviewDecks = [dailyDeck, ...flashcardDecks];
  const [activeDeck, setActiveDeck] = useState<string>(dailyDeck.id);
  const [index, setIndex] = useState(0); const [revealed, setRevealed] = useState(false);
  const [practiceMode, setPracticeMode] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false); const [deleteOpen, setDeleteOpen] = useState(false);
  const [front, setFront] = useState(""); const [back, setBack] = useState(""); const [example, setExample] = useState("");
  const [savingCard, setSavingCard] = useState(false);
  const today = localDate();
  const allCards = useMemo(() => [...customCards, ...cards], [customCards]);
  const dailyCards = useMemo(() => buildDailyReviewQueue(allCards, reviews, today, 10), [allCards, reviews, today]);
  const deckCards = activeDeck === dailyDeck.id ? allCards : allCards.filter((item) => item.deck === activeDeck);
  const dueCards = buildDailyReviewQueue(deckCards, reviews, today, 10);
  const reviewQueue = practiceMode ? deckCards : dueCards;
  const card = reviewQueue.length ? reviewQueue[index % reviewQueue.length] : undefined;
  const learned = allCards.filter((item) => reviews.some((review) => review.cardId === item.id && review.intervalDays >= 4)).length;

  const rate = useCallback(async (rating: number) => {
    if (!card) return;
    if (practiceMode) { setIndex((value) => value + 1); setRevealed(false); return; }
    try {
      const result = await post({ action:"reviewCard", cardId:card.id, rating }) as { review: Review };
      onReviewUpdated(result.review);
      setRevealed(false);
    } catch { setToast("Não foi possível salvar a revisão."); }
  }, [card, onReviewUpdated, post, practiceMode, setToast]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (!card) return;
      if (!revealed && (event.key === " " || event.key === "Enter")) { event.preventDefault(); setRevealed(true); }
      if (revealed && ["1", "2", "3", "4"].includes(event.key)) void rate(Number(event.key));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [card, rate, revealed]);

  function selectDeck(id: string) { setActiveDeck(id); setIndex(0); setRevealed(false); setPracticeMode(false); }
  function nextCard() { setIndex((value) => value + 1); setRevealed(false); }
  function speak(text: string) {
    if (!("speechSynthesis" in window)) return setToast("Seu navegador não oferece leitura em voz alta.");
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text); utterance.lang = "en-US"; utterance.rate = .82;
    window.speechSynthesis.speak(utterance);
  }
  async function addCard() {
    if (!front.trim() || !back.trim()) return setToast("Preencha a expressão e o significado.");
    setSavingCard(true);
    try {
      const result = await post({ action:"addCustomCard", front, back, example }) as { card: Flashcard };
      onCustomCardAdded(result.card); setFront(""); setBack(""); setExample(""); setAddOpen(false); setActiveDeck("personal"); setIndex(0);
      setToast("Cartão adicionado ao seu vocabulário.");
    } catch { setToast("Não foi possível criar o cartão."); }
    finally { setSavingCard(false); }
  }
  async function deleteCard() {
    if (!card || !card.id.startsWith("custom:")) return;
    setSavingCard(true);
    try { await post({ action:"deleteCustomCard", cardId:card.id }); onCustomCardDeleted(card.id); setDeleteOpen(false); setIndex(0); setRevealed(false); setToast("Cartão removido."); }
    catch { setToast("Não foi possível remover o cartão."); }
    finally { setSavingCard(false); }
  }

  return <div className="view-stack">
    <div className="review-stats"><div><Brain /><span><b>{allCards.length}</b> cartões disponíveis</span></div><div><Clock3 /><span><b>{dailyCards.length}</b> na sessão de hoje</span></div><div><Trophy /><span><b>{learned}</b> consolidados</span></div><button className="quick-quiz-launch" onClick={() => setQuizOpen(true)}><Sparkles /><span><b>Desafio de 5</b> quiz rápido</span></button></div>
    <div className="review-shell">
      <aside className="deck-sidebar panel"><div className="deck-title"><Layers3 /><span><b>Seus baralhos</b><small>Comece pela sessão de hoje</small></span><button className="add-card-mini" onClick={() => setAddOpen(true)} aria-label="Criar cartão"><Plus /></button></div>{reviewDecks.map((deck) => { const deckPool = deck.id === dailyDeck.id ? allCards : allCards.filter((item) => item.deck === deck.id); const count = deckPool.length; const due = buildDailyReviewQueue(deckPool, reviews, today, 10).length; return <button key={deck.id} className={activeDeck === deck.id ? "active" : ""} onClick={() => selectDeck(deck.id)}><i className={deck.color} /><span><b>{deck.title}</b><small>{deck.description}</small></span><em>{due || count}</em></button>; })}</aside>
      <section className="review-stage"><div className="review-top"><div><span className="eyebrow cyan">REPETIÇÃO ESPAÇADA</span><h2>{reviewDecks.find((deck) => deck.id === activeDeck)?.title}</h2></div><div className="review-top-actions"><span>{reviewQueue.length} cartões hoje</span><button onClick={() => setAddOpen(true)}><Plus />Novo</button></div></div>{card ? <><div className={`flashcard ${revealed ? "revealed" : ""}`} onClick={() => setRevealed(true)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setRevealed(true); }} role="button" tabIndex={0}><div className="flashcard-tools"><button onClick={(event) => { event.stopPropagation(); speak(card.front); }} aria-label="Ouvir pronúncia"><Volume2 /></button>{card.id.startsWith("custom:") && <button className="delete-card" onClick={(event) => { event.stopPropagation(); setDeleteOpen(true); }} aria-label="Excluir cartão"><Trash2 /></button>}</div><span>EXPRESSÃO</span><h3>{card.front}</h3>{revealed ? <div className="answer"><b>{card.back}</b>{card.example && <p>“{card.example}”</p>}<button onClick={(event) => { event.stopPropagation(); speak(card.example || card.front); }}><Volume2 />Ouvir exemplo</button></div> : <div className="reveal-hint"><RotateCcw />Pense primeiro. Toque para revelar.</div>}</div>{revealed && (practiceMode ? <div className="practice-next"><Button onClick={() => rate(3)}>Próximo cartão</Button></div> : <div className="rating-row"><button onClick={() => rate(1)}><b>De novo</b><span>1 · &lt; 1 min</span></button><button onClick={() => rate(2)}><b>Difícil</b><span>2 · 1 dia</span></button><button onClick={() => rate(3)}><b>Bom</b><span>3 · 2 dias</span></button><button onClick={() => rate(4)}><b>Fácil</b><span>4 · 4+ dias</span></button></div>)}<button className="skip-card" onClick={nextCard}>Pular este cartão</button></> : deckCards.length === 0 ? <div className="custom-empty"><Brain /><h3>Seu baralho pessoal começa aqui</h3><p>Adicione palavras e expressões que encontrar em vídeos, histórias, jogos ou livros.</p><Button onClick={() => setAddOpen(true)}><Plus />Criar primeiro cartão</Button></div> : <div className="custom-empty review-complete"><Trophy /><h3>Revisão concluída por hoje</h3><p>Você terminou os cartões programados. Volte amanhã ou pratique novamente sem alterar seu progresso.</p><Button onClick={() => { setPracticeMode(true); setIndex(0); }}><RotateCcw />Praticar novamente</Button></div>}<p className="review-note">Primeiro vêm as revisões vencidas; depois, no máximo 10 cartões novos. Use espaço para revelar e as teclas 1–4 para avaliar.</p></section>
    </div>
    <section className="review-tips panel"><div><Brain /><h3>Como usar como Anki</h3><p>Revise os cartões vencidos antes de aprender novos. Marque “Difícil” ou “De novo” com honestidade; o sistema encurta o próximo intervalo.</p></div><ol><li>Faça uma sessão curta todos os dias.</li><li>Leia a frente e responda em voz alta.</li><li>Confira tradução e exemplo.</li><li>Crie uma frase pessoal antes do próximo cartão.</li></ol><div className="rule-box"><span>LIMITE SAUDÁVEL</span><p>Aprenda <strong>5–10 expressões novas</strong> por dia e mantenha as revisões sob controle.</p></div></section>

    <Dialog open={addOpen} onOpenChange={setAddOpen}><DialogContent className="card-form-dialog"><DialogHeader><DialogTitle>Novo cartão</DialogTitle><DialogDescription>Salve uma expressão completa e um exemplo que faça sentido para você.</DialogDescription></DialogHeader><div className="card-form"><label><span>Expressão em inglês</span><Input value={front} onChange={(event) => setFront(event.target.value)} maxLength={120} placeholder="Ex.: I figured it out" autoFocus /></label><label><span>Significado</span><Input value={back} onChange={(event) => setBack(event.target.value)} maxLength={220} placeholder="Ex.: Eu consegui entender" /></label><label><span>Exemplo em inglês (opcional)</span><Textarea value={example} onChange={(event) => setExample(event.target.value)} maxLength={300} placeholder="Ex.: I finally figured out how the game works." /></label></div><DialogFooter><Button variant="outline" onClick={() => setAddOpen(false)}>Cancelar</Button><Button onClick={addCard} disabled={savingCard}>{savingCard ? "Salvando..." : "Adicionar cartão"}</Button></DialogFooter></DialogContent></Dialog>
    <QuickQuiz key={quizOpen ? `quiz-${today}` : "quiz-closed"} open={quizOpen} setOpen={setQuizOpen} allCards={allCards} date={today} />
    <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Excluir este cartão?</AlertDialogTitle><AlertDialogDescription>Ele também será removido das suas revisões. Essa ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={deleteCard} disabled={savingCard}>Excluir</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
  </div>;
}

function QuickQuiz({ open, setOpen, allCards, date }: { open: boolean; setOpen: (value: boolean) => void; allCards: Flashcard[]; date: string }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const quizCards = useMemo(() => [...allCards]
    .sort((a, b) => stableHash(`${date}:quiz:${a.id}`) - stableHash(`${date}:quiz:${b.id}`))
    .slice(0, Math.min(5, allCards.length)), [allCards, date]);
  const finished = index >= quizCards.length;
  const question = finished ? undefined : quizCards[index];
  const options = useMemo(() => {
    if (!question) return [];
    const distractors = allCards
      .filter((card) => card.id !== question.id)
      .sort((a, b) => stableHash(`${question.id}:${a.id}`) - stableHash(`${question.id}:${b.id}`))
      .slice(0, 3);
    return [question, ...distractors]
      .sort((a, b) => stableHash(`${date}:${question.id}:option:${a.id}`) - stableHash(`${date}:${question.id}:option:${b.id}`));
  }, [allCards, date, question]);

  function choose(card: Flashcard) {
    if (!question || selected) return;
    setSelected(card.id);
    if (card.id === question.id) setScore((value) => value + 1);
  }

  function next() { setIndex((value) => value + 1); setSelected(null); }

  return <Dialog open={open} onOpenChange={setOpen}><DialogContent className="quiz-dialog"><DialogHeader><div className="quiz-kicker"><Sparkles />DESAFIO DE 5</div><DialogTitle>{finished ? "Resultado do desafio" : `Questão ${index + 1} de ${quizCards.length}`}</DialogTitle><DialogDescription>{finished ? "Use o resultado para decidir o que merece mais revisão." : "Qual expressão em inglês corresponde ao significado abaixo?"}</DialogDescription></DialogHeader>{finished ? <div className="quiz-result"><span>{score}/{quizCards.length}</span><h3>{score === quizCards.length ? "Excelente!" : score >= 3 ? "Bom trabalho!" : "Vale revisar mais um pouco."}</h3><p>{score === quizCards.length ? "Você reconheceu todas as expressões sem ajuda." : "Abra a sessão de hoje e tente recordar a resposta antes de revelar cada cartão."}</p><Button onClick={() => { setIndex(0); setSelected(null); setScore(0); }}><RotateCcw />Tentar novamente</Button></div> : question ? <div className="quiz-body"><div className="quiz-progress"><Progress value={(index / quizCards.length) * 100} /><span>{score} acertos</span></div><div className="quiz-prompt">{question.back}</div><div className="quiz-options">{options.map((option) => { const chosen = selected === option.id; const correct = option.id === question.id; return <button key={option.id} className={selected ? correct ? "correct" : chosen ? "wrong" : "dimmed" : ""} onClick={() => choose(option)} disabled={!!selected}>{option.front}</button>; })}</div>{selected && <div className="quiz-feedback"><b>{selected === question.id ? "Correto!" : `Resposta: ${question.front}`}</b><p>{question.example}</p><Button onClick={next}>{index === quizCards.length - 1 ? "Ver resultado" : "Próxima questão"}</Button></div>}</div> : <div className="quiz-result"><p>Adicione pelo menos quatro cartões para liberar o desafio.</p></div>}</DialogContent></Dialog>;
}

function ProgressView({ days, streak, profile }: { days: StudyDay[]; streak: number; profile: Profile }) {
  const total = days.reduce((sum, day) => sum + day.minutes, 0); const activeDays = days.filter((d) => d.minutes > 0).length; const best = Math.max(0, ...days.map((d) => d.minutes));
  const week = Array.from({ length: 7 }, (_, index) => { const date = dateMinus(6 - index); return { date, minutes: days.find((d) => d.studyDate === date)?.minutes ?? 0 }; });
  const weekMinutes = week.reduce((sum, day) => sum + day.minutes, 0);
  const weekDays = week.filter((day) => day.minutes > 0).length;
  const weeklyGoal = profile.dailyMinutes * 5;
  const weeklyProgress = Math.min(100, Math.round((weekMinutes / weeklyGoal) * 100));
  const remaining = Math.max(0, weeklyGoal - weekMinutes);
  const coachTitle = remaining === 0 ? "Meta semanal concluída" : weekDays === 0 ? "Comece com uma sessão curta" : `${remaining} minutos para fechar a semana`;
  const coachText = remaining === 0
    ? "Você atingiu cinco sessões equivalentes. Use o próximo estudo para revisar ou consumir algo por prazer."
    : `Você praticou em ${weekDays} ${weekDays === 1 ? "dia" : "dias"}. Divida o restante em blocos pequenos para não depender de uma maratona.`;
  return <div className="view-stack">
    <div className="stat-grid"><Stat icon={Flame} value={String(streak)} label="sequência atual" accent="orange" /><Stat icon={Clock3} value={`${Math.floor(total/60)}h ${total%60}m`} label="tempo estudado" accent="cyan" /><Stat icon={Target} value={String(activeDays)} label="dias ativos" accent="violet" /><Stat icon={Trophy} value={`${best} min`} label="melhor sessão" accent="lime" /></div>
    <section className="panel weekly-coach"><div><span className="eyebrow cyan">META DE 5 DIAS</span><h2>{coachTitle}</h2><p>{coachText}</p></div><div className="weekly-meter"><div><span>{weekMinutes} de {weeklyGoal} min</span><b>{weeklyProgress}%</b></div><Progress value={weeklyProgress} /><small>{weekDays}/5 dias praticados</small></div></section>
    <section className="panel chart-panel"><PanelHead title="Últimos 7 dias" subtitle={`Meta: ${profile.dailyMinutes} minutos por dia`} action={`${weekMinutes} min`} /><div className="bar-chart">{week.map((day) => <div className="bar-col" key={day.date}><span>{day.minutes || ""}</span><div><i style={{ height:`${Math.max(4, Math.min(100, day.minutes/profile.dailyMinutes*100))}%` }} /></div><b>{new Intl.DateTimeFormat("pt-BR",{weekday:"short",timeZone:"UTC"}).format(new Date(`${day.date}T12:00:00Z`)).replace(".","")}</b></div>)}</div></section>
    <section className="panel milestones"><PanelHead title="Marcos" subtitle="Progresso que representa prática real" /><div className="milestone-grid"><div className={activeDays >= 1 ? "earned" : ""}><span><Play /></span><b>Primeiro passo</b><small>Concluir um dia</small></div><div className={streak >= 7 ? "earned" : ""}><span><Flame /></span><b>Uma semana</b><small>7 dias seguidos</small></div><div className={total >= 600 ? "earned" : ""}><span><Clock3 /></span><b>10 horas</b><small>600 min estudados</small></div><div className={activeDays >= 30 ? "earned" : ""}><span><Trophy /></span><b>Constância</b><small>30 dias ativos</small></div></div></section>
  </div>;
}

function MethodView({ level }: { level: Level }) {
  const methods = [
    { n:"01", title:"Input compreensível", text:"Leia e escute algo que você consegue acompanhar. O desafio deve existir, mas o conteúdo não pode virar um código indecifrável.", tip:"Alvo prático: entender a ideia e cerca de 95% das palavras." },
    { n:"02", title:"Recuperação ativa", text:"Feche a resposta e tente lembrar. Releitura parece fácil, mas recordar sem olhar fortalece a memória de forma mais útil.", tip:"Use frases próprias, não listas gigantes de palavras." },
    { n:"03", title:"Repetição espaçada", text:"Reveja a informação depois de intervalos crescentes. O sistema traz cartões de volta antes de você esquecê-los por completo.", tip:"Poucas revisões diárias são melhores do que uma maratona." },
    { n:"04", title:"Produção com feedback", text:"Fale e escreva desde o começo. Compare sua produção com modelos, corrija um ponto e tente de novo.", tip:"Foque em um erro de cada vez." },
    { n:"05", title:"Tarefas reais", text:"O nível não é uma coleção de regras. É o que você consegue fazer: explicar, pedir, resumir, opinar e negociar significado.", tip:"Toda semana termine um pequeno projeto em inglês." },
  ];
  return <div className="view-stack">
    <section className="method-hero"><span className="eyebrow cyan">COMO APRENDER</span><h2>Um sistema simples, apoiado por evidências</h2><p>A plataforma combina métodos que resolvem problemas diferentes. Input aumenta repertório; recuperação e espaçamento retêm; produção transforma conhecimento em habilidade.</p><div className="method-loop"><span>ENTENDER</span><i /><span>LEMBRAR</span><i /><span>USAR</span><i /><span>CORRIGIR</span></div></section>
    <div className="method-grid">{methods.map((method) => <article className="method-card" key={method.n}><span>{method.n}</span><h3>{method.title}</h3><p>{method.text}</p><div><Sparkles />{method.tip}</div></article>)}</div>
    <section><PanelHead title="Guias práticos" subtitle="Transforme seus interesses em sessões de estudo" /><div className="guide-grid">{practicalGuides.map((guide, index) => <article className="guide-card" key={guide.title}><div><span>0{index + 1}</span><h3>{guide.title}</h3></div><ol>{guide.steps.map((step) => <li key={step}>{step}</li>)}</ol></article>)}</div></section>
    <section className="advice-panel panel"><div className="advice-title"><Lightbulb /><div><span className="eyebrow cyan">CONSELHOS IMPORTANTES</span><h2>O que acelera — e o que atrasa</h2></div></div><div className="advice-columns"><div><h3><Check />Faça</h3><ul><li>Estude quase todos os dias, mesmo que por pouco tempo.</li><li>Escolha conteúdo um pouco acima do confortável.</li><li>Fale desde o início e grave sua própria voz.</li><li>Aprenda expressões completas dentro de frases.</li><li>Volte ao mesmo áudio mais de uma vez.</li><li>Meça horas de prática, não apenas dias de aplicativo.</li></ul></div><div><h3><X />Evite</h3><ul><li>Traduzir palavra por palavra durante toda a leitura.</li><li>Salvar dezenas de palavras que você nunca revisará.</li><li>Usar legenda em português como padrão.</li><li>Trocar de método toda semana.</li><li>Esperar dominar a gramática para começar a falar.</li><li>Estudar apenas quando estiver muito motivado.</li></ul></div></div></section>
    <section className="level-roadmap panel"><div><span className="eyebrow">ROTA CEFR</span><h3>Você está em {levelCopy[level].label} ({level})</h3><p>{levelCopy[level].canDo} O próximo passo é treinar {levelCopy[level].focus} em tarefas que façam sentido para você.</p></div><div className="level-line">{(["A1","A2","B1","B2","C1"] as Level[]).map((item) => <span key={item} className={item === level ? "current" : ""}><i />{item}</span>)}</div></section>
    <section className="sources panel"><PanelHead title="Fontes e critérios" subtitle="Por que o método foi montado assim" /><div>{researchSources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.title}><span><b>{source.title}</b><small>{source.org} · {source.note}</small></span><ExternalLink /></a>)}</div></section>
  </div>;
}

function FocusSession({ task, onClose, onComplete, onNavigate }: { task: StudyTask | null; onClose: () => void; onComplete: (task: StudyTask) => Promise<void>; onNavigate: (view: View) => void }) {
  const [remaining, setRemaining] = useState((task?.minutes ?? 0) * 60);
  const [running, setRunning] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const total = Math.max(1, (task?.minutes ?? 0) * 60);
  const steps: Record<string, string[]> = {
    INPUT: ["Ouça uma vez sem pausar e tente entender o tema.", "Ouça de novo com legenda ou transcrição em inglês.", "Escolha no máximo três expressões úteis."],
    MEMÓRIA: ["Leia a frente do cartão e responda sem olhar.", "Diga a resposta em voz alta.", "Crie uma frase pessoal antes de avaliar."],
    "PRONÚNCIA": ["Escolha um trecho de 20–30 segundos.", "Escute e repita junto três vezes.", "Grave uma tentativa e compare o ritmo."],
    OUTPUT: ["Produza primeiro sem traduzir cada frase.", "Use pelo menos uma expressão nova.", "Revise só um erro importante e tente novamente."],
  };

  useEffect(() => {
    if (!running || remaining <= 0) return;
    const timer = window.setTimeout(() => {
      setRemaining(Math.max(0, remaining - 1));
      if (remaining <= 1) setRunning(false);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [remaining, running]);

  if (!task) return null;
  const minutes = Math.floor(remaining / 60); const seconds = remaining % 60;
  async function finish() { if (!task || finishing) return; setFinishing(true); await onComplete(task); setFinishing(false); }
  return <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}><DialogContent className="focus-dialog"><DialogHeader><div className="focus-label"><span>{task.skill}</span><span>{task.minutes} minutos</span></div><DialogTitle>{task.title}</DialogTitle><DialogDescription>{task.instruction}</DialogDescription></DialogHeader><div className="focus-layout"><div className="focus-timer"><div className="timer-ring" style={{ "--session-progress": `${((total - remaining) / total) * 360}deg` } as React.CSSProperties}><div><b>{String(minutes).padStart(2,"0")}:{String(seconds).padStart(2,"0")}</b><span>{running ? "em foco" : remaining === 0 ? "tempo concluído" : "pronto"}</span></div></div><div className="timer-controls"><Button onClick={() => setRunning((value) => !value)}>{running ? <Pause /> : <Play />}{running ? "Pausar" : remaining === total ? "Iniciar" : "Continuar"}</Button><Button variant="outline" className="timer-reset" onClick={() => { setRemaining(total); setRunning(false); }} aria-label="Reiniciar cronômetro"><TimerReset /></Button></div></div><div className="focus-guide"><span className="eyebrow cyan">FAÇA ASSIM</span><ol>{(steps[task.skill] ?? [task.instruction]).map((step) => <li key={step}>{step}</li>)}</ol>{task.url ? <a className="focus-resource" href={task.url} target="_blank" rel="noreferrer"><ExternalLink />Abrir {task.resource || "material"}</a> : task.skill === "MEMÓRIA" ? <button className="focus-resource" onClick={() => onNavigate("review")}><Brain />Ir para os flashcards</button> : null}<small>O cronômetro continua enquanto o material abre em outra aba.</small></div></div><DialogFooter className="focus-footer"><Button variant="outline" onClick={onClose}>Continuar depois</Button><Button onClick={finish} disabled={finishing}><Check />{finishing ? "Salvando..." : "Concluir tarefa"}</Button></DialogFooter></DialogContent></Dialog>;
}

function SetupDialog({ open, setOpen, step, setStep, draft, setDraft, required, onSave, saving }: { open: boolean; setOpen: (value:boolean)=>void; step:number; setStep:(value:number)=>void; draft:Profile; setDraft:React.Dispatch<React.SetStateAction<Profile>>; required:boolean; onSave:()=>void; saving:boolean }) {
  const [testing, setTesting] = useState(false); const [question, setQuestion] = useState(0); const [score, setScore] = useState(0);
  const interestIcons: Record<Interest, typeof Gamepad2> = {
    games: Gamepad2, anime: Sparkles, cartoons: Smile, movies: Play, series: Library, books: BookOpen,
    music: Music, sports: Trophy, travel: Plane, tech: Compass, science: FlaskConical, history: History,
    food: CookingPot, fitness: Dumbbell, work: Briefcase, study: GraduationCap, news: Newspaper, daily: CircleUserRound,
  };
  function answer(index:number) { const nextScore = score + (index === diagnosticQuestions[question].answer ? 1 : 0); if (question < diagnosticQuestions.length - 1) { setScore(nextScore); setQuestion(question + 1); } else { const level:Level = nextScore <= 1 ? "A1" : nextScore === 2 ? "A2" : nextScore === 3 ? "B1" : nextScore === 4 ? "B2" : "C1"; setDraft((d)=>({...d,level})); setTesting(false); setQuestion(0); setScore(0); setToastNative(`Nível estimado: ${level}`); } }
  return <Dialog open={open} onOpenChange={(value) => { if (!required || value) setOpen(value); }}><DialogContent className="setup-dialog" showCloseButton={!required}><DialogHeader><div className="setup-kicker"><span>{step+1}</span> de 3</div><DialogTitle>{step === 0 ? "Onde você está agora?" : step === 1 ? "Qual é o seu objetivo?" : "O que prende sua atenção?"}</DialogTitle><DialogDescription>{step === 0 ? "Escolha seu nível ou faça uma estimativa rápida. Você poderá mudar depois." : step === 1 ? "Isso define a duração e o tipo das tarefas diárias." : "Escolha tudo que combina com você. Seu plano e suas recomendações serão montados a partir dessas escolhas."}</DialogDescription></DialogHeader>{step === 0 && (testing ? <div className="diagnostic"><div className="diagnostic-head"><span>Questão {question+1}/{diagnosticQuestions.length}</span><Progress value={(question+1)/diagnosticQuestions.length*100} /></div><h3>{diagnosticQuestions[question].q}</h3>{diagnosticQuestions[question].options.map((option,index)=><button key={option} onClick={()=>answer(index)}>{option}</button>)}</div> : <><div className="level-options">{(["A1","A2","B1","B2","C1"] as Level[]).map((level)=><button key={level} className={draft.level===level?"active":""} onClick={()=>setDraft((d)=>({...d,level}))}><b>{level}</b><span>{levelCopy[level].label}</span><small>{levelCopy[level].canDo}</small></button>)}</div><button className="test-link" onClick={()=>setTesting(true)}><Brain />Não sei meu nível — fazer teste rápido</button></>)}{step === 1 && <div className="setup-section"><label>Objetivo principal</label><div className="goal-options">{Object.entries(goals).map(([id,label])=><button key={id} className={draft.goal===id?"active":""} onClick={()=>setDraft((d)=>({...d,goal:id}))}>{label}</button>)}</div><label>Tempo realista por dia</label><div className="time-options">{[15,30,45,60].map((minutes)=><button key={minutes} className={draft.dailyMinutes===minutes?"active":""} onClick={()=>setDraft((d)=>({...d,dailyMinutes:minutes}))}><b>{minutes}</b><span>min</span></button>)}</div></div>}{step === 2 && <div className="interest-options">{(Object.keys(interestLabels) as Interest[]).map((interest)=>{const Icon=interestIcons[interest];const active=draft.interests.includes(interest);return <button key={interest} className={active?"active":""} onClick={()=>setDraft((d)=>({...d,interests:active?d.interests.filter((i)=>i!==interest):[...d.interests,interest]}))}><Icon /><span>{interestLabels[interest]}</span>{active&&<Check />}</button>})}</div>}<DialogFooter className="setup-footer">{step>0?<Button variant="outline" onClick={()=>setStep(step-1)}>Voltar</Button>:<span/>}<Button onClick={()=>step<2?setStep(step+1):onSave()} disabled={testing||saving}>{saving?"Salvando...":step<2?"Continuar":"Criar meu plano"}</Button></DialogFooter></DialogContent></Dialog>;
}

function setToastNative(message:string) { window.dispatchEvent(new CustomEvent("eq-toast", { detail: message })); }

function PanelHead({ title, subtitle, action, actionButton, onAction }: { title:string; subtitle?:string; action?:string; actionButton?:string; onAction?:()=>void }) { return <div className="panel-head"><div><h2>{title}</h2>{subtitle&&<p>{subtitle}</p>}</div>{action&&<span>{action}</span>}{actionButton&&<button onClick={onAction}>{actionButton}<ChevronRight /></button>}</div>; }
function HeatStrip({ dates }: { dates:Set<string> }) { return <div className="heat-strip">{Array.from({length:14},(_,i)=>{const date=dateMinus(13-i);return <span key={date} className={dates.has(date)?"active":""} title={date}/>})}</div>; }
function Stat({ icon:Icon, value, label, accent }:{ icon:typeof Home; value:string; label:string; accent:string }) { return <div className={`stat-card ${accent}`}><span><Icon /></span><div><b>{value}</b><small>{label}</small></div></div>; }
function LoadingView() { return <div className="loading-view"><span/><span/><span/></div>; }
