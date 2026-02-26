ALTER TABLE "careers" ADD COLUMN "location" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "careers" ADD COLUMN "is_remote" boolean DEFAULT false NOT NULL;