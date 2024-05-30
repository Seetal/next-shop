"use client";

import { useState } from "react";
import { nanoid } from "nanoid";

// COMPONENTS
import AddImage from "../AddImage/AddImage";
import CategoryList from "../CategoryList/CategoryList";
import SubCategoryList from "../SubCategoryList/SubCategoryList";

// ACTIONS
import { addProductToDatabase } from "@/actions/add-product-to-database";

// HELPERS
import { productInitialValue } from "./helpers/productInitialValue";
import { validationInitialValue } from "./helpers/validationInitialValue";
import { isMinLengthValidation } from "@/utils/validation/isMinLengthValidation";
import { imageValidationInitialValue } from "../AddImage/helpers/imageValidationInitialValue";
import { containsStringValidation } from "@/utils/validation/containsStringValidation";

// TYPES
import { ProductType } from "@/types/productType";
import { ImageDetailsType } from "@/types/imageDetailsType";
import { CategoryType } from "@/types/categoryType";
import { ValidationType } from "@/types/validationType";
import { ImageValidationType } from "@/types/ImageValidationType";

type Props = {
	categories: CategoryType[];
}

const AddProduct = ({ categories }: Props) => {
	const [productDetails, setProductDetails] = useState<ProductType>(productInitialValue);
	const [validation, setValidation] = useState<ValidationType>(validationInitialValue)
	const [imgValidation, setImgValidation] = useState<ImageValidationType>(imageValidationInitialValue);

	const categoriesArray = categories.map(category => {
		return {
			id: category.id.toString(),
			category: category.category
		}
	})

	let selectedCategory: CategoryType = {
		id: 0,
		category: '',
		subCategories: {
			data: [{ id: '', subCategory: ''}]
		}
	}

	if(productDetails.category) {
		selectedCategory = categories.find(item => item.category === productDetails.category) as CategoryType;
	}

	const isImageValid = (name: string, value: string) => {
		const isFieldValid = name === 'imgUrl' ? 
		containsStringValidation(value, 'https://') : 
		isMinLengthValidation(value, 3);

		setImgValidation(prevState => {
			return {
				...prevState, [name]: {
					isValid: !isFieldValid,
					isValidVisible: isFieldValid
				}
			}
		})
	}

	const isFieldValid = (name: string, value: string) => {
		const isMinLength = name === 'price' ? isMinLengthValidation(value, 1) : isMinLengthValidation(value, 3);
		setValidation(prevState => {
			return {
				...prevState, [name]: {
					isValid: !isMinLength,
					isValidVisible: isMinLength
				}
			}
		})
	}

	const handleProductDetails = (e: React.FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setProductDetails(prevState => {
			return {
				...prevState, [name]: value
			}
		})
		isFieldValid(name, value);
	}

	const handleSelectCategory = (category: string, level: string) => {
		setProductDetails(prevState => {
			return {
				...prevState, [level]: category
			}
		})
		setValidation(prevState => {
			return {
				...prevState, [level]: {...prevState[level as keyof ValidationType], isValid: true}
			}
		})
	}

	const handleAddImage = (imgDetails: ImageDetailsType) => {
		setProductDetails(prevState => {
			console.log(prevState);
			return {
				...prevState,
				images: { data: [...prevState.images.data, { ...imgDetails, id: nanoid()}]}
			}
		})
		setValidation(prevState => {
			return {
				...prevState, images: {...prevState.images, isValid: true}
			}
		})
	}

	const productValidationCheck = () => {
		for (const [key, value] of Object.entries(validation)) {
			if(value.isValid === false) {
				return false;
			}
		}
		return true;
	}

	const handleAddProductToDatabase = async () => {
		const isValid = productValidationCheck();
		if(isValid) {
			const updatedProductDetails = {
				...productDetails, 
				images: JSON.stringify(productDetails.images),
				price: Number(productDetails.price)
			}
			const response = await addProductToDatabase(updatedProductDetails)
			if (response.ok) {
				console.log('Product Added');
				setProductDetails(productInitialValue);
				setValidation(validationInitialValue);
				setImgValidation(imageValidationInitialValue);
			}
		} else {
			isFieldValid('name', productDetails.name);
			isFieldValid('description', productDetails.description);
			isFieldValid('price', productDetails.price);
			isFieldValid('category', productDetails.category);
			if(productDetails.images.data.length > 1) {
				isImageValid('images', productDetails.images.data[0].imgUrl);
				isImageValid('images', productDetails.images.data[0].altText);
			} else {
				setImgValidation({
					imgUrl: {
						isValid: false,
						isValidVisible: true
					},
					altText: {
						isValid: false,
						isValidVisible: true
					}
				})
			}
		}
	}
    return (
		<>
			<form>
				<ul>
					<li>
						<label htmlFor="name">
							Product name
							{validation.name.isValidVisible && <span className="">Min Length is 3</span>}
						</label>
						<input type="text" id="name" value={productDetails.name} name="name" onChange={handleProductDetails} />
					</li>
					<li>
						<label htmlFor="description">
							Description
							{validation.description.isValidVisible && <span className="">Min Length is 3</span>}
						</label>
						<input type="text" id="description" value={productDetails.description} name="description" onChange={handleProductDetails} />
					</li>
					<li>
						<label htmlFor="price">
							Price
							{validation.price.isValidVisible && <span className="">Price is required</span>}
						</label>
						<input type="number" id="price" value={productDetails.price} name="price" onChange={handleProductDetails} />
					</li>
					<li>
						<label htmlFor="category">
							Category
							{validation.category.isValidVisible && <span className="">Min Length is 3</span>}
						</label>
						{productDetails.category ? productDetails.category : 'No category selected'}
						{categories.length > 0 && <CategoryList categories={categoriesArray} handleSelectCategory={handleSelectCategory} />}
					</li>
					{productDetails.category && 
						<li>
							<label htmlFor="subCategory">Sub-category</label>
							{productDetails.subCategory ? productDetails.subCategory : 'No subcategory selected'}
							{categories.length > 0 && <SubCategoryList subCategories={selectedCategory?.subCategories?.data} handleSelectSubCategory={handleSelectCategory} />}
						</li>
					}
					<li>
						<AddImage handleAddImage={handleAddImage} uploadedImages={productDetails.images} imgValidation={imgValidation} isImageValid={isImageValid} />
					</li>
					<li>
						<button type="button" onClick={handleAddProductToDatabase}>Add Product</button>
					</li>
				</ul>
			</form>
			<p><strong>Name</strong>: {productDetails.name}</p>
			<p><strong>Description</strong>: {productDetails.description}</p>
			<p><strong>Price</strong>: {productDetails.price}</p>
			<p><strong>Category</strong>: {productDetails.category}</p>
			<p><strong>Sub Category</strong>: {productDetails.subCategory}</p>
		</>
    )
};

export default AddProduct;