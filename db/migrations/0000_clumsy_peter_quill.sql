CREATE TABLE "waitlist_signups" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "waitlist_signups_email_unique" UNIQUE("email")
);
