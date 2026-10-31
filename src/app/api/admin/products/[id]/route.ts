import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db/client";
import { products } from "@/db/schema";
import { getAdminContext } from "@/lib/admin/authorization";

const updateInput = z.object({
  name: z.string().trim().min(1).max(160).optional(),
  description: z.string().trim().max(2000).optional(),
  priceCents: z.number().int().nonnegative().max(100_000_000).optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
}).refine((value) => Object.keys(value).length > 0);

const productId = z.uuid();

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { isAdmin, configurationError } = await getAdminContext();
  if (configurationError) return NextResponse.json({ error: configurationError }, { status: 503 });
  if (!isAdmin) return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  if (!db) return NextResponse.json({ error: "Base non configurée." }, { status: 503 });

  const { id } = await params;
  if (!productId.safeParse(id).success) return NextResponse.json({ error: "Identifiant invalide." }, { status: 400 });

  const parsed = updateInput.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Modification invalide." }, { status: 400 });

  const [product] = await db.update(products).set({ ...parsed.data, updatedAt: new Date() }).where(eq(products.id, id)).returning();
  return product ? NextResponse.json({ product }) : NextResponse.json({ error: "Produit introuvable." }, { status: 404 });
}
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { isAdmin, configurationError } = await getAdminContext();
  if (configurationError) return NextResponse.json({ error: configurationError }, { status: 503 });
  if (!isAdmin) return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  if (!db) return NextResponse.json({ error: "Base non configurée." }, { status: 503 });

  const { id } = await params;
  if (!productId.safeParse(id).success) return NextResponse.json({ error: "Identifiant invalide." }, { status: 400 });

  const [product] = await db.update(products).set({ status: "archived", updatedAt: new Date() }).where(eq(products.id, id)).returning({ id: products.id, status: products.status });
  return product ? NextResponse.json({ product }) : NextResponse.json({ error: "Produit introuvable." }, { status: 404 });
}
