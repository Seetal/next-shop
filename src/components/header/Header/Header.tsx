
// Components
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import Utilities from "../Utilities/Utilities";

import { getCategoriesFromDatabase } from "@/actions/get-categories-from-database";

import "./Header.scss";

const Header = async () => {

	const categories = await getCategoriesFromDatabase();

	return (
		<header className="header">
			<div className="header__inner">
				<Logo />
				<Utilities />
			</div>
			<Nav categories={categories} />
		</header>
	)
};

export default Header;
