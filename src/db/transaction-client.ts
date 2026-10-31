import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl && process.env.NODE_ENV === "production") {
  throw new Error("DATABASE_URL is required in production");
}

const globalForDatabase = globalThis as typeof globalThis & { novaPool?: Pool };

const pool = databaseUrl
  ? (globalForDatabase.novaPool ??= new Pool({ connectionString: databaseUrl, max: 3 }))
  : null;

export const transactionDb = pool ? drizzle(pool, { schema }) : null;
