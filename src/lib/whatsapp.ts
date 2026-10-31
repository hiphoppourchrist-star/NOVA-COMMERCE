export function createWhatsAppLink(number: string | undefined, productName: string, productSlug: string): string | null {
  const normalized = number?.replace(/[^0-9]/g, "");
  if (!normalized) return null;
  const message = `Bonjour, je suis intéressé(e) par le produit « ${productName} » (${productSlug}). Pouvez-vous me renseigner ?`;
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}
