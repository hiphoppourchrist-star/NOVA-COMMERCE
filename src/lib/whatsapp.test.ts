import assert from "node:assert/strict";
import test from "node:test";
import { createWhatsAppLink } from "./whatsapp";
test("builds a safe WhatsApp product link", () => { const link = createWhatsAppLink("+33 6 12 34 56 78", "Lampe Nova", "lampe-nova"); assert.match(link ?? "", /^https:\/\/wa\.me\/33612345678\?text=/); assert.match(link ?? "", /Lampe%20Nova/); });
test("does not create a fake contact link without configuration", () => assert.equal(createWhatsAppLink(undefined, "Produit", "produit"), null));
