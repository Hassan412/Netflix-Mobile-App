CREATE TABLE `user_profiles` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`userId` integer NOT NULL,
	`profilePicture` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text,
	`favoriteIds` text DEFAULT '[]',
	FOREIGN KEY (`userId`) REFERENCES `user_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user_table` (
	`id` integer PRIMARY KEY NOT NULL,
	`image` text,
	`email` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`hashedPassword` text,
	`updated_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_table_email_unique` ON `user_table` (`email`);