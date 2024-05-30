"use client";

import { useState } from "react";
import "./AddImage.scss"

// TYPES
import { ImageArrayType } from "@/types/imageArrayType";
import { ImageDetailsType } from "@/types/imageDetailsType";
import { ImageValidationType } from "@/types/ImageValidationType";

type Props = {
	handleAddImage: (imgUrl: ImageDetailsType) => void;
	uploadedImages: ImageArrayType;
	imgValidation: ImageValidationType;
	isImageValid: (name: string, value: string) => void;
}

const initialImageDetailsValue = {
	imgUrl: "",
	altText: ""
}

const AddImage = ({ handleAddImage, uploadedImages, imgValidation, isImageValid }: Props) => {
	const [imgDetails, setImgDetails] = useState<ImageDetailsType>(initialImageDetailsValue);

	const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setImgDetails(prevState => {
			return {
				...prevState, [name]: value
			}
		})
		isImageValid(name, value);
	}

	const handleImageSubmit = () => {
		if(imgValidation.imgUrl.isValid && imgValidation.altText.isValid) {
			handleAddImage(imgDetails);
			setImgDetails(initialImageDetailsValue);
		} else {
			isImageValid('imgUrl', imgDetails.imgUrl);
			isImageValid('altText', imgDetails.altText);
		}
	}
	return (
		<>
			<fieldset>
				<legend>Images</legend>
				<ul>
					<li>
						<label htmlFor="images">
							Image Url
							{imgValidation.imgUrl.isValidVisible && <span>Must contain &#96;https://&#96;</span>}
						</label>
						<input type="text" id="images" name="imgUrl" onChange={handleChange} value={imgDetails.imgUrl} />
					</li>
					<li>
						<label htmlFor="altText">
							Alt text
							{imgValidation.altText.isValidVisible && <span>Min Length is 3</span>}	
						</label>
						<input type="text" id="altText" name="altText" onChange={handleChange} value={imgDetails.altText} />
					</li>
					<button type="button" onClick={handleImageSubmit}>
						{uploadedImages.data.length > 0 ? "Add another image" : "Add image"}
					</button>
				</ul>
			</fieldset>
			<div className="add-image">
				{uploadedImages.data.map(image => {
					return (
						<div key={image.id} className="add-image__item">
							<img src={image.imgUrl} alt="" />
							<p>{image.altText}</p>
						</div>
					)
				})}
			</div>
		</>
	)
};

export default AddImage;
