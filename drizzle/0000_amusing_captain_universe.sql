CREATE TABLE IF NOT EXISTS "shrinkit"."custom_urls" (
	"custom_url_id" varchar(256) PRIMARY KEY NOT NULL,
	"username" varchar(256) NOT NULL,
	"custom_url" varchar(256) NOT NULL,
	"original_url" text NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" varchar(256) DEFAULT 'Nameless' NOT NULL,
	"visit_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shrinkit"."password_tokens" (
	"token" varchar(256) PRIMARY KEY NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"token_expiry" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shrinkit"."shrink_urls" (
	"url_id" varchar(256) PRIMARY KEY NOT NULL,
	"shrink_url" varchar(256) NOT NULL,
	"original_url" text NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" varchar(256) DEFAULT 'Nameless' NOT NULL,
	"visit_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shrinkit"."users" (
	"uid" varchar(256) PRIMARY KEY NOT NULL,
	"username" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
