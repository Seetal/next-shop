"use server";

import { db } from "@/db/db";
import { productsTable } from "@/db/schema";
import { revalidatePath } from "next/cache";

export const addProductToDatabase = async (productData: any) => {
    console.log('productData', productData);
    try {
        await db.insert(productsTable).values(productData);
        //revalidatePath("/admin/add-product");
    } catch (error) {
        return {
            ok: false
        }
    }

    return {
        ok: true
    }

}