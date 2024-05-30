type SubCategory = {
	id: string;
	subCategory: string;
}

export type CategoryType = {
	id: number;
	category: string;
	subCategories: {
		data: SubCategory[];
	};
}