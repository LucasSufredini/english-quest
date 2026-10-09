CREATE TABLE `custom_cards` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`deck` text DEFAULT 'personal' NOT NULL,
	`front` text NOT NULL,
	`back` text NOT NULL,
	`example` text DEFAULT '' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_custom_cards_user_created` ON `custom_cards` (`user_id`,`created_at`);