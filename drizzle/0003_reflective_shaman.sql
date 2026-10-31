ALTER TABLE "orders" ADD COLUMN "access_token" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "orders_access_token_idx" ON "orders" USING btree ("access_token");