"use server";

import { db } from "@/db/db";
import { categoriesTable } from "@/db/schema";
import { revalidatePath } from "next/cache";

export const addCategoryToDatabase = async (categoryData: any) => {
    console.log('categoryData', categoryData);
    try {
        await db.insert(categoriesTable).values(categoryData);
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