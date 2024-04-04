CREATE TABLE `password_tokens` (
	`token` text PRIMARY KEY NOT NULL,
	`user_id` varchar(256) NOT NULL,
	`token_expiry` timestamp NOT NULL);
