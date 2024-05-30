"use client";

import { useState } from "react";
import Link from "next/link";

import './Nav.scss';

const Nav = ({ categories }) => {
	const [ isNavOpen, setIsNavOpen] =  useState(false);

	const handleMenuClick = () => {
		setIsNavOpen(prevState => !prevState);
	}
	
	const navItems = categories.map(item => {
		return (
			<li key={item.id}>
				<Link href="/">{item.category}</Link>
				{item.subCategories.data.length > 0 && 
				<ul>
					{item.subCategories.data.map(subCategory => {
						return (
							<li key={subCategory.id}>
								<Link href="/">{subCategory.subCategory}</Link>
							</li>
						)
					})}
				</ul>
				}
			</li>
		)
	})

	return (
		<nav className="nav" aria-labelledby="nav-label">
			<span id="nav-label" hidden>Site Navigation</span>
			<div className={isNavOpen ? 'overlay active' : 'overlay'} onClick={handleMenuClick}></div>
			<button className="nav__menu-btn" onClick={handleMenuClick} aria-expanded={isNavOpen ? 'true' : 'false'}>
				<span className="nav__menu-btn-icon"></span>
				<span className="nav__menu-btn-text">Menu</span>
			</button>
			{/*@ts-ignore*/}
			<div className={isNavOpen ? 'nav__menu active' : 'nav__menu'} inert={isNavOpen ? undefined : 'true'}>
				<button onClick={handleMenuClick}><span className="sr-only">Close</span>x</button>
				<ul>
					{navItems}
				</ul>
			</div>
		</nav>
	)
};

export default Nav;
