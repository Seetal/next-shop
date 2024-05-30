import { useState } from 'react';
import './SubCategoryList.scss';


// ACTIONS
import { updateCategoryInDatabase } from '@/actions/update-category-in-database';

// TYPES

type SubCategoryArrayItem = {
	id: string;
	[key: string]: string;
}

type Props = {
	subCategories: SubCategoryArrayItem[];
	handleSelectSubCategory: (category: string, level: string) => void;
}

const SubCategoryList = ({ subCategories, handleSelectSubCategory }: Props) => {
	const [ subCategory, setSubCategory ] = useState<string>('');

	const filteredCategories = subCategories.filter((subCategoryItem) => {
        if(subCategoryItem.subCategory.toLocaleLowerCase().includes(subCategory.toLowerCase())) {
            return subCategoryItem
        }
    })

	const selectSubCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLButtonElement;
		handleSelectSubCategory(target.name, 'subCategory');
		setSubCategory('');
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSubCategory(e.target.value);
	}

	const handleCancelCategory = () => {
		setSubCategory('');
	}

	const handleAddSubCategory = async () => {

	}

	const subCategoryButtons = filteredCategories.map(subCategoryItem => {
		return (
			<li className="category-list__item" key={subCategoryItem.id}>
				<button type="button" name={subCategoryItem.subCategory} onClick={selectSubCategory}>{subCategoryItem.subCategory}</button>
			</li>
		)
	})

	return (
		<div>
			{
				subCategories.length === 0 && <p>No Subs</p>
			}
			<input className="category-list__filter" type="text" id="category" value={subCategory} name="category" onChange={handleChange} />
			{filteredCategories.length > 0 && 
				<ul className="category-list">
					{subCategoryButtons}
				</ul>
			}
			{subCategories.length > 0 && filteredCategories.length === 0 && 
				<>
					<p>There is no saved categories called &#96;{subCategory}&#96;, would you like to add it as a new category?</p>
					<button type="button" onClick={handleAddSubCategory}>Yes</button>
					<button type="button" onClick={handleCancelCategory}>No</button>
				</>
			}
		</div>
	)
};

export default SubCategoryList;
