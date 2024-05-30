'use server';

import { db } from "@/db/db";
import { productsTable } from "@/db/schema";

export async function getCategoriesFromDatabase() {
	const response = await db.select().from(productsTable);
	return response;
}