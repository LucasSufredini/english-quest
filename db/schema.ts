import { sql } from "drizzle-orm";
import { index, integer, primaryKey, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const profiles = sqliteTable("profiles", {
  userId: text("user_id").primaryKey(),
  displayName: text("display_name").notNull().default("Estudante"),
  level: text("level").notNull().default("A2"),
  goal: text("goal").notNull().default("conversation"),
  dailyMinutes: integer("daily_minutes").notNull().default(30),
  interests: text("interests").notNull().default("[]"),
  onboardingComplete: integer("onboarding_complete", { mode: "boolean" }).notNull().default(false),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const studyDays = sqliteTable("study_days", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").notNull(),
  studyDate: text("study_date").notNull(),
  minutes: integer("minutes").notNull().default(0),
  tasksCompleted: text("tasks_completed").notNull().default("[]"),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [uniqueIndex("idx_study_days_user_date").on(table.userId, table.studyDate)]);

export const reviewCards = sqliteTable("review_cards", {
  userId: text("user_id").notNull(),
  cardId: text("card_id").notNull(),
  repetitions: integer("repetitions").notNull().default(0),
  intervalDays: integer("interval_days").notNull().default(0),
  ease: integer("ease").notNull().default(250),
  dueDate: text("due_date").notNull(),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [primaryKey({ columns: [table.userId, table.cardId] })]);

export const customCards = sqliteTable("custom_cards", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  deck: text("deck").notNull().default("personal"),
  front: text("front").notNull(),
  back: text("back").notNull(),
  example: text("example").notNull().default(""),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [index("idx_custom_cards_user_created").on(table.userId, table.createdAt)]);
