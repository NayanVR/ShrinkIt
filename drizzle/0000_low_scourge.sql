CREATE TABLE `users` (
	`uid` varchar(256) PRIMARY KEY NOT NULL,
	`username` varchar(256) NOT NULL,
	`email` varchar(256) NOT NULL,
	`password` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()));
