CREATE TABLE `custom_urls` (
	`custom_url_id` varchar(256) PRIMARY KEY NOT NULL,
	`name` varchar(256) NOT NULL,
	`username` varchar(256) NOT NULL,
	`shrink_url` varchar(256) NOT NULL,
	`original_url` text NOT NULL,
	`visit_count` int NOT NULL DEFAULT 0,
	`user_id` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()));

ALTER TABLE `shrink_urls` ADD `name` varchar(256) NOT NULL;
ALTER TABLE `shrink_urls` ADD `visit_count` int DEFAULT 0 NOT NULL;