import { ImageArrayType } from "./imageArrayType";

export type ProductType = {
	name: string;
	description: string;
	price: string;
	category: string;
	subCategory: string;
	images: ImageArrayType;
}