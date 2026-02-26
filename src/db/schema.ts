import { relations, sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/pg-core';
import z from 'zod';

export const timestamp = {
  createdAt: t
    .timestamp('created_at', { withTimezone: true, mode: 'date' })
    .notNull()
    .defaultNow(),
  updatedAt: t
    .timestamp('updated_at', { withTimezone: true, mode: 'date' })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const userRole = t.pgEnum('userRole', ['admin', 'staff', 'customer']);
export const productStatus = t.pgEnum('productStatus', [
  'draft',
  'published',
  'out of stock',
]);
export const orderStatus = t.pgEnum('orderStatus', [
  'pending',
  'cancelled',
  'paid',
]);
export const applicationStatus = t.pgEnum('applicationStatus', [
  'reviewed',
  'rejected',
  'accepted',
  'uploaded',
]);
export const userGender = t.pgEnum('userGender', ['male', 'female', 'other']);
export const contactSubject = t.pgEnum('contactSubject', [
  'franchising',
  'supplying',
]);

export const UserTable = t.pgTable(
  'users',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    firstName: t.varchar('first_name', { length: 50 }).notNull(),
    lastName: t.varchar('last_name', { length: 50 }).notNull(),
    phone: t.varchar('phone', { length: 15 }),
    email: t.varchar('email', { length: 50 }).notNull(),
    clerkUserId: t.varchar('clerk_user_id', { length: 255 }).notNull().unique(),
    gender: userGender('gender'),
    imageUrl: t.varchar('image_url', { length: 255 }),
    role: userRole('role').notNull().default('customer'),
    points: t.integer('points').notNull().default(0),
    ...timestamp,
  },
  (table) => [
    t.check('point_check', sql`${table.points} >= 0`),
    t.uniqueIndex('clerk_user_id_idx').on(table.clerkUserId),
  ],
);

export const AddressTable = t.pgTable('addresses', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  userId: t
    .uuid('user_id')
    .references(() => UserTable.id, { onDelete: 'cascade' })
    .notNull(),
  address1: t.varchar('address1', { length: 255 }).notNull(),
  address2: t.varchar('address2', { length: 255 }),
  city: t.varchar('city', { length: 20 }).notNull(),
  state: t.varchar('state', { length: 20 }),
  country: t.varchar('country', { length: 50 }).notNull(),
  zip: t.varchar('zip', { length: 10 }).notNull(),
  isDefault: t.boolean('is_default').notNull().default(false),
  ...timestamp,
});

export const ProductTable = t.pgTable(
  'products',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    sanityId: t.varchar('sanity_id', { length: 255 }).notNull().unique(),
    basePriceInCents: t.integer('base_price_in_cents').notNull(),
    imageUrl: t.varchar('image_url', { length: 255 }).notNull(),
    numberInStocks: t.integer('number_in_stocks').notNull().default(0),
    status: productStatus('status').notNull().default('draft'),
    isDeleted: t.boolean('is_deleted').notNull().default(false),
    ...timestamp,
  },
  (table) => [
    t.check('number_in_stock_check', sql`${table.numberInStocks} >= 0`),
    t.check('price_check', sql`${table.basePriceInCents} > 0`),
    t
      .index('active_products_idx')
      .on(table.status)
      .where(sql`status = 'published'`),
  ],
);

export const OrderTable = t.pgTable(
  'orders',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'cascade' })
      .notNull(),
    stripeCheckoutSessionId: t
      .varchar('stripe_checkout_session_id', { length: 255 })
      .unique(),
    stripePaymentIntentId: t
      .varchar('stripe_payment_intent_id', { length: 255 })
      .unique(),
    status: orderStatus('status').notNull().default('pending'),
    totalInCentsSnapshot: t.integer('total_in_cents_snapshot').notNull(),
    currency: t.varchar('currency', { length: 5 }).notNull(),
    ...timestamp,
  },
  (table) => [
    t.check('total_check', sql`${table.totalInCentsSnapshot} > 0`),
    t.index('user_order_idx').on(table.userId),
  ],
);

export const OrderItemTable = t.pgTable(
  'order_items',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    productId: t
      .uuid('product_id')
      .references(() => ProductTable.id, { onDelete: 'cascade' })
      .notNull(),
    orderId: t
      .uuid('order_id')
      .references(() => OrderTable.id, { onDelete: 'cascade' })
      .notNull(),
    priceInCentsSnapshot: t.integer('price_in_cents_snapshot').notNull(),
    quantity: t.integer('quantity').notNull().default(1),
    ...timestamp,
  },
  (table) => [
    t.check('quantity_check', sql`${table.quantity} > 0`),
    t.check('price_check', sql`${table.priceInCentsSnapshot} > 0`),
    t.index('order_idx').on(table.orderId),
  ],
);

export const ReviewTable = t.pgTable(
  'reviews',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'cascade' })
      .notNull(),
    productId: t
      .uuid('product_id')
      .references(() => ProductTable.id, { onDelete: 'cascade' })
      .notNull(),
    title: t.varchar('title', { length: 255 }).notNull(),
    rating: t.integer('rating').notNull().default(1),
    body: t.text('body').notNull(),
    imageUrl: t.varchar('image_url', { length: 255 }),
    reviewedAt: t
      .timestamp('reviewedAt', { withTimezone: true, mode: 'date' })
      .notNull(),
    ...timestamp,
  },
  (table) => [
    t.check('rating_check', sql`${table.rating} BETWEEN 1 AND 5`),
    t.uniqueIndex('user_product_review_idx').on(table.userId, table.productId),
    t.index('product_idx').on(table.productId),
  ],
);

export const NewsletterTable = t.pgTable('newsletter', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: t.varchar('name', { length: 255 }).notNull(),
  email: t.varchar('email', { length: 255 }).notNull().unique(),
  ...timestamp,
});

export const ContactTable = t.pgTable('contacts', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: t.varchar('name', { length: 255 }).notNull(),
  email: t.varchar('email', { length: 255 }).notNull(),
  subject: contactSubject('subject').notNull().default('franchising'),
  message: t.text('message').notNull(),
  ...timestamp,
});

export const CareerTable = t.pgTable('careers', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  sanityId: t.varchar('sanity_id', { length: 255 }).notNull().unique(),
  position: t.varchar('position', { length: 255 }).notNull(),
  postedAt: t
    .timestamp('posted_at', { withTimezone: true, mode: 'date' })
    .notNull(),
  isDeleted: t.boolean('is_deleted').notNull().default(false),
  location: t.varchar('location', { length: 100 }).notNull(),
  isRemote: t.boolean('is_remote').notNull().default(false),
  ...timestamp,
});

export const ApplicationTable = t.pgTable(
  'applications',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'cascade' })
      .notNull(),
    careerId: t
      .uuid('career_id')
      .references(() => CareerTable.id, { onDelete: 'cascade' })
      .notNull(),
    status: applicationStatus('status').notNull().default('uploaded'),
    resumeUrl: t.varchar('resume_url', { length: 255 }).notNull(),
    ...timestamp,
  },
  (table) => [
    t.uniqueIndex('user_career_idx').on(table.userId, table.careerId),
  ],
);

export const PreviousEmployerTable = t.pgTable('previous_employers', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  applicationId: t
    .uuid('application_id')
    .references(() => ApplicationTable.id, { onDelete: 'cascade' })
    .notNull(),
  name: t.varchar('name', { length: 50 }).notNull(),
  email: t.varchar('email', { length: 50 }).notNull(),
  phone: t.varchar('phone', { length: 50 }).notNull(),
  position: t.varchar('position', { length: 100 }),
  reasonForLeaving: t.text('reason_for_leaving').notNull(),
  startDate: t
    .timestamp('start_date', { withTimezone: true, mode: 'date' })
    .notNull(),
  endDate: t.timestamp('end_date', { withTimezone: true, mode: 'date' }),
  ...timestamp,
});

// Relations
export const UserTableRelations = relations(UserTable, ({ many }) => ({
  addresses: many(AddressTable),
  orders: many(OrderTable),
  reviews: many(ReviewTable),
  applications: many(ApplicationTable),
}));

export const ProductTableRelations = relations(ProductTable, ({ many }) => ({
  orderItems: many(OrderItemTable),
  reviews: many(ReviewTable),
}));

export const OrderTableRelations = relations(OrderTable, ({ one, many }) => ({
  user: one(UserTable, {
    fields: [OrderTable.userId],
    references: [UserTable.id],
  }),
  orderItems: many(OrderItemTable),
}));

export const AddressTableRelations = relations(AddressTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [AddressTable.userId],
    references: [UserTable.id],
  }),
}));

export const OrderItemTableRelations = relations(OrderItemTable, ({ one }) => ({
  product: one(ProductTable, {
    fields: [OrderItemTable.productId],
    references: [ProductTable.id],
  }),
  order: one(OrderTable, {
    fields: [OrderItemTable.orderId],
    references: [OrderTable.id],
  }),
}));

export const ReviewTableRelations = relations(ReviewTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [ReviewTable.userId],
    references: [UserTable.id],
  }),
  product: one(ProductTable, {
    fields: [ReviewTable.productId],
    references: [ProductTable.id],
  }),
}));

export const CareerTableRelations = relations(CareerTable, ({ many }) => ({
  applications: many(ApplicationTable),
}));

export const ApplicationTableRelations = relations(
  ApplicationTable,
  ({ one, many }) => ({
    career: one(CareerTable, {
      fields: [ApplicationTable.careerId],
      references: [CareerTable.id],
    }),
    user: one(UserTable, {
      fields: [ApplicationTable.userId],
      references: [UserTable.id],
    }),
    previousEmployers: many(PreviousEmployerTable),
  }),
);

export const PreviousEmployerTableRelations = relations(
  PreviousEmployerTable,
  ({ one }) => ({
    application: one(ApplicationTable, {
      fields: [PreviousEmployerTable.applicationId],
      references: [ApplicationTable.id],
    }),
  }),
);

// types
export type UserTableSchema = z.infer<typeof UserTable.$inferSelect>;
export type AddressTableSchema = z.infer<typeof AddressTable.$inferSelect>;
export type ProductTableSchema = z.infer<typeof ProductTable.$inferSelect>;
export type OrderItemTableSchema = z.infer<typeof OrderItemTable.$inferSelect>;
export type OrderTableSchema = z.infer<typeof OrderTable.$inferSelect>;
export type ReviewTableSchema = z.infer<typeof ReviewTable.$inferSelect>;
export type NewsletterTableSchema = z.infer<
  typeof NewsletterTable.$inferSelect
>;
export type ContactTableSchema = z.infer<typeof ContactTable.$inferSelect>;
export type CareerTableSchema = z.infer<typeof CareerTable.$inferSelect>;
export type ApplicationTableSchema = z.infer<
  typeof ApplicationTable.$inferSelect
>;
export type PreviousEmployerTableSchema = z.infer<
  typeof PreviousEmployerTable.$inferSelect
>;
