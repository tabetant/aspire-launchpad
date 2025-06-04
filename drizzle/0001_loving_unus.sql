CREATE TABLE "applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text DEFAULT '' NOT NULL,
	"company" text DEFAULT '' NOT NULL,
	"status" "status" NOT NULL,
	"date_applied" date DEFAULT now() NOT NULL,
	"notes" text
);
