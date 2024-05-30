import Link from "next/link";
import "./Utilities.scss";

const Utilities = () => {
	return (
		<ul className="utils">
			<li>
				<button className="utils__btn">
					<span className="utils__icon utils__icon--search">
						<svg xmlns="http://www.w3.org/2000/svg" className="utils__svg" viewBox="0 0 20 20.5"><path className="utils__path" d="m19.7 18.8-4.4-4.4c1.3-1.5 2.1-3.5 2.1-5.7 0-4.8-3.9-8.7-8.7-8.7S0 3.9 0 8.7c0 4.8 3.9 8.7 8.7 8.7 1.9 0 3.7-.6 5.2-1.7l4.4 4.4c.4.4 1 .4 1.4 0 .4-.3.4-1 0-1.3zM2 8.7a6.7 6.7 0 1 1 13.4 0A6.7 6.7 0 0 1 2 8.7z"/></svg>
					</span>
					<span className="utils__text">Search</span>
				</button>
			</li>
			<li>
				<Link href="/account" className="utils__btn">
					<span className="utils__icon">
						<svg xmlns="http://www.w3.org/2000/svg" className="utils__svg" viewBox="0 0 20 22.5"><path className="utils__path" d="M13.5 10.1c1.3-1 2.1-2.6 2.1-4.4C15.7 2.5 13.1 0 10 0S4.3 2.5 4.3 5.7c0 1.7.9 3.3 2.2 4.3C2.7 11.5 0 15.1 0 19.4v3.1h2.3V19.4c0-4.3 3.5-7.7 7.7-7.7 4.3 0 7.8 3.5 7.8 7.8v3H20v-3c0-4.4-2.7-8-6.5-9.4zM10 2.3c1.9 0 3.4 1.5 3.4 3.4S11.9 9 10 9 6.6 7.5 6.6 5.7 8.1 2.3 10 2.3z"/></svg>
					</span>
					<span className="utils__text">Account</span>
				</Link>
			</li>
			<li>
				<Link href="/basket" className="utils__btn">
					<span className="utils__icon">
						<svg xmlns="http://www.w3.org/2000/svg" className="utils__svg" viewBox="0 0 20 22.2"><path className="utils__path" d="m17.7 7.3-7-7c-.2-.2-.4-.3-.7-.3-.3 0-.5.1-.7.3l-7 7H0l2.6 12.9c.2 1.2 1.2 2.1 2.5 2.1h9.8c1.2 0 2.3-.9 2.5-2.1L20 7.3h-2.3zM10 2.4l4.9 4.9H5.1L10 2.4zm5.6 17.2c-.1.5-.5.8-1 .8H5.4c-.5 0-.9-.3-1-.8L2.3 9.3h15.5l-2.2 10.3z" /></svg>
					</span>
					<span className="utils__text">Basket</span>
				</Link>
			</li>
		</ul>
	)
};

export default Utilities;
