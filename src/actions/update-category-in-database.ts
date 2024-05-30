"use server";
import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { categoriesTable } from "@/db/schema";
import { revalidatePath } from "next/cache";

export const updateCategoryInDatabase = async (categoryData: any, id: number) => {
    try {
        await db.insert(categoriesTable).values(categoryData);
		await db.update(categoriesTable).set(categoryData).where(eq(categoriesTable.id, id));
        revalidatePath("/admin/add-product");
    } catch (error) {
        return {
            ok: false
        }
    }

    return {
        ok: true
    }

}