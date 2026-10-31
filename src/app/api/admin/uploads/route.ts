import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminContext } from "@/lib/admin/authorization";
import { objectStorage } from "@/lib/storage";

const inputSchema = z.object({
  contentType: z.enum(["image/jpeg", "image/png", "image/webp", "image/avif"]),
  fileName: z.string().trim().min(1).max(120).regex(/^[a-zA-Z0-9._-]+$/),
});

export async function POST(request: Request) {
  const { isAdmin, configurationError } = await getAdminContext();
  if (configurationError) return NextResponse.json({ error: configurationError }, { status: 503 });
  if (!isAdmin) return NextResponse.json({ error: "Accès refusé." }, { status: 403 });

  const parsed = inputSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Fichier invalide." }, { status: 400 });

  try {
    const key = "products/" + crypto.randomUUID() + "-" + parsed.data.fileName;
    return NextResponse.json(await objectStorage.createUploadUrl({ key, contentType: parsed.data.contentType }));
  } catch (error) {
    if (error instanceof Error && error.message === "OBJECT_STORAGE_NOT_CONFIGURED") {
      return NextResponse.json({ error: "Le stockage objet n'est pas configuré." }, { status: 503 });
    }
    console.error("upload_url_failed");
    return NextResponse.json({ error: "Impossible de préparer l'upload." }, { status: 500 });
  }
}
