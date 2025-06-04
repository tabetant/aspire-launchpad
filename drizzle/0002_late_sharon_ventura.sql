ALTER TABLE "applications" ALTER COLUMN "notes" SET DEFAULT 'now';--> statement-breakpoint
ALTER TABLE "applications" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "applications" ADD COLUMN "resume_url" text;