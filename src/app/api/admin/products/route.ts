import { asc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db/client";
import { products } from "@/db/schema";
import { getAdminContext } from "@/lib/admin/authorization";

const productInput = z.object({
  name: z.string().trim().min(1).max(160),
  slug: z.string().trim().min(1).max(160).regex(/^[a-z0-9-]+$/),
  description: z.string().trim().max(2000).optional(),
  priceCents: z.number().int().nonnegative().max(100_000_000),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
});

export async function GET() {
  const { isAdmin } = await getAdminContext();
  if (!isAdmin) return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  if (!db) return NextResponse.json({ products: [] });
  return NextResponse.json({ products: await db.select().from(products).orderBy(asc(products.createdAt)) });
}
export async function POST(request: Request) {
  const { isAdmin } = await getAdminContext();
  if (!isAdmin) return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  if (!db) return NextResponse.json({ error: "Base non configurée." }, { status: 503 });

  const parsed = productInput.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Produit invalide." }, { status: 400 });

  try {
    const [product] = await db.insert(products).values(parsed.data).returning();
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("admin_product_create_failed", { message: error instanceof Error ? error.message : "unknown" });
    return NextResponse.json({ error: "Le produit n'a pas pu être créé. Vérifiez que le slug est unique." }, { status: 409 });
  }
}
