CREATE TABLE `profiles` (
	`user_id` text PRIMARY KEY NOT NULL,
	`display_name` text DEFAULT 'Estudante' NOT NULL,
	`level` text DEFAULT 'A2' NOT NULL,
	`goal` text DEFAULT 'conversation' NOT NULL,
	`daily_minutes` integer DEFAULT 30 NOT NULL,
	`interests` text DEFAULT '[]' NOT NULL,
	`onboarding_complete` integer DEFAULT false NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `review_cards` (
	`user_id` text NOT NULL,
	`card_id` text NOT NULL,
	`repetitions` integer DEFAULT 0 NOT NULL,
	`interval_days` integer DEFAULT 0 NOT NULL,
	`ease` integer DEFAULT 250 NOT NULL,
	`due_date` text NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY(`user_id`, `card_id`)
);
--> statement-breakpoint
CREATE TABLE `study_days` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`study_date` text NOT NULL,
	`minutes` integer DEFAULT 0 NOT NULL,
	`tasks_completed` text DEFAULT '[]' NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_study_days_user_date` ON `study_days` (`user_id`,`study_date`);
--> statement-breakpoint
PRAGMA optimize;
