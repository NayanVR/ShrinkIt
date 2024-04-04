CREATE TABLE `urls` (
	`url_id` varchar(256) PRIMARY KEY NOT NULL,
	`shrink_url` varchar(256) NOT NULL,
	`original_url` text NOT NULL,
	`user_id` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()));

ALTER TABLE `urls` ADD CONSTRAINT `urls_user_id_users_uid_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`uid`) ON DELETE no action ON UPDATE no action;