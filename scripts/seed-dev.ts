import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { categories, products, productVariants } from "../src/db/schema";

config({ path: ".env.local" });

if (process.env.NODE_ENV === "production" || process.env.SEED_DEVELOPMENT !== "true") {
  throw new Error("Seed blocked. Set SEED_DEVELOPMENT=true and never run it against production data.");
}

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is required");

const db = drizzle(neon(url));
const [category] = await db.insert(categories).values({ name: "Objets essentiels", slug: "objets-essentiels", description: "Une sélection pour les gestes du quotidien." }).onConflictDoNothing().returning();
if (!category) throw new Error("Category already exists; seed stopped to remain idempotent and non-destructive.");

const [product] = await db.insert(products).values({ categoryId: category.id, name: "Aura Desk Light", slug: "aura-desk-light", description: "Une lumière douce pour les espaces qui comptent.", priceCents: 8900, currency: "EUR", status: "published" }).returning();
if (!product) throw new Error("Product seed failed");
await db.insert(productVariants).values({ productId: product.id, sku: "NOVA-AURA-SAND", name: "Sable", stockQuantity: 12 });
console.log(`Seeded development product ${product.slug}`);
