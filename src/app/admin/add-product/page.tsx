// COMPONENTS
import AddProduct from "@/components/admin/AddProduct/AddProduct";

// ACTIONS
import { getCategoriesFromDatabase } from "@/actions/get-categories-from-database";

// TYPES

import { CategoryType } from "@/types/categoryType";

const AddProductPage = async () => {

    const categories = await getCategoriesFromDatabase();

    return (
        <>
            <h1>Add Product</h1>
            <AddProduct categories={categories} />
        </>
    )
};

export default AddProductPage;
