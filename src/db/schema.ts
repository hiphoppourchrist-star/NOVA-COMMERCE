import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex("categories_slug_idx").on(table.slug)]);

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  categoryId: uuid("category_id").references(() => categories.id),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  priceCents: integer("price_cents").notNull(),
  compareAtPriceCents: integer("compare_at_price_cents"),
  currency: text("currency").default("EUR").notNull(),
  status: text("status").default("draft").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex("products_slug_idx").on(table.slug)]);

export const productVariants = pgTable("product_variants", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id").references(() => products.id, { onDelete: "cascade" }).notNull(),
  sku: text("sku").notNull(),
  name: text("name").notNull(),
  priceCents: integer("price_cents"),
  stockQuantity: integer("stock_quantity").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex("product_variants_sku_idx").on(table.sku)]);

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  customerId: text("customer_id"),
  accessToken: text("access_token").notNull(),
  email: text("email").notNull(),
  status: text("status").default("pending").notNull(),
  paymentStatus: text("payment_status").default("pending").notNull(),
  currency: text("currency").default("EUR").notNull(),
  subtotalCents: integer("subtotal_cents").notNull(),
  shippingCents: integer("shipping_cents").notNull(),
  discountCents: integer("discount_cents").notNull(),
  totalCents: integer("total_cents").notNull(),
  idempotencyKey: text("idempotency_key"),
  promotionCode: text("promotion_code"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex("orders_idempotency_key_idx").on(table.idempotencyKey), uniqueIndex("orders_access_token_idx").on(table.accessToken)]);

export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id").references(() => orders.id, { onDelete: "cascade" }).notNull(),
  productId: uuid("product_id").references(() => products.id, { onDelete: "set null" }),
  variantId: uuid("variant_id").references(() => productVariants.id, { onDelete: "set null" }),
  productName: text("product_name").notNull(),
  sku: text("sku").notNull(),
  quantity: integer("quantity").notNull(),
  unitPriceCents: integer("unit_price_cents").notNull(),
  lineTotalCents: integer("line_total_cents").notNull(),
});

export const stockMovements = pgTable("stock_movements", {
  id: uuid("id").defaultRandom().primaryKey(),
  variantId: uuid("variant_id").references(() => productVariants.id, { onDelete: "restrict" }).notNull(),
  orderId: uuid("order_id").references(() => orders.id, { onDelete: "set null" }),
  quantityDelta: integer("quantity_delta").notNull(),
  reason: text("reason").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const promotions = pgTable("promotions", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: text("code").notNull(),
  kind: text("kind").notNull(),
  value: integer("value").notNull(),
  active: integer("active").default(1).notNull(),
  startsAt: timestamp("starts_at", { withTimezone: true }),
  endsAt: timestamp("ends_at", { withTimezone: true }),
  maxRedemptions: integer("max_redemptions"),
  redemptionCount: integer("redemption_count").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex("promotions_code_idx").on(table.code)]);

export const categoriesRelations = relations(categories, ({ many }) => ({ products: many(products) }));
export const productsRelations = relations(products, ({ one, many }) => ({ category: one(categories, { fields: [products.categoryId], references: [categories.id] }), variants: many(productVariants) }));
export const productVariantsRelations = relations(productVariants, ({ one }) => ({ product: one(products, { fields: [productVariants.productId], references: [products.id] }) }));
export const ordersRelations = relations(orders, ({ many }) => ({ items: many(orderItems), stockMovements: many(stockMovements) }));
export const orderItemsRelations = relations(orderItems, ({ one }) => ({ order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }), product: one(products, { fields: [orderItems.productId], references: [products.id] }), variant: one(productVariants, { fields: [orderItems.variantId], references: [productVariants.id] }) }));
export const stockMovementsRelations = relations(stockMovements, ({ one }) => ({ variant: one(productVariants, { fields: [stockMovements.variantId], references: [productVariants.id] }), order: one(orders, { fields: [stockMovements.orderId], references: [orders.id] }) }));
