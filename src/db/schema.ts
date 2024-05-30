import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const productsTable = sqliteTable('products', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description').notNull(),
	price: integer('price', { mode: 'number' }).notNull(),
	category: text('category').notNull(),
	subCategory: text('subCategory'),
	images: text('images').notNull()
});

export const categoriesTable = sqliteTable('categories', {
	id: integer('id').primaryKey(),
	category: text('category').notNull(),
	subCategories: text('subCategories', { mode: 'json' }).$type<string>()
});