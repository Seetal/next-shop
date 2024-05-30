'use server';

import { db } from "@/db/db";
import { categoriesTable } from "@/db/schema";

export async function getCategoriesFromDatabase() {
	const response = await db.select().from(categoriesTable);
	return response;
}