import { useState } from 'react';
import './CategoryList.scss';

// ACTIONS

import { addCategoryToDatabase } from '@/actions/add-category-to-database';

// TYPES

type CategoryArrayItem = {
	id: string;
	category: string;
}

type Props = {
	categories: CategoryArrayItem[];
	handleSelectCategory: (category: string, level: string) => void;
}

const CategoryList = ({ categories, handleSelectCategory }: Props) => {
	const [ category, setCategory ] = useState<string>('');

	const filteredCategories = categories.filter((categoryItem) => {
        if(categoryItem.category.toLocaleLowerCase().includes(category.toLowerCase())) {
            return categoryItem
        }
    })

	const selectCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLButtonElement;
		handleSelectCategory(target.name, 'category');
		setCategory('');
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCategory(e.target.value);
	}

	const handleCancelCategory = () => {
		setCategory('');
	}

	const handleAddCategory = async () => {
		const newCategory = {
			category: category,
			subCategories: {
				data: []
			}
		}
		const response = await addCategoryToDatabase(newCategory);
		
		if(response.ok) {
			console.log('Category Added');
		}
	}

	const categoryButtons = filteredCategories.map(categoryItem => {
		return (
			<li className="category-list__item" key={categoryItem.id}>
				<button type="button" name={categoryItem.category} onClick={selectCategory}>{categoryItem.category}</button>
			</li>
		)
	})

	return (
		<>
			<input className="category-list__filter" type="text" id="category" value={category} name="category" onChange={handleChange} />
			{filteredCategories.length > 0 && 
				<ul className="category-list">
					{categoryButtons}
				</ul>
			}
			{categories.length > 0 && filteredCategories.length === 0 && 
				<>
					<p>There is no saved categories called &#96;{category}&#96;, would you like to add it as a new category?</p>
					<button type="button" onClick={handleAddCategory}>Yes</button>
					<button type="button" onClick={handleCancelCategory}>No</button>
				</>
			}
		</>
	)
};

export default CategoryList;