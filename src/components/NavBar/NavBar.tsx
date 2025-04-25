import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import ThemeToggle from "./ThemeToggle";

export default function NavBar() {
	const location = useLocation();
	const { theme } = useAppSelector((state) => state.general);

	const linkClass = (path: string) =>
		`px-3  m-1 text-black/60 hover:scale-110 hover:text-black/100 transition-all duration-200 ${
			location.pathname === path ? "text-black/100 underline" : ""
		}`;

	return (
		<div className="p-3 max-w-screen-2xl fixed top-0 left-0 right-0 z-10">
			<div className="h-10 w-full flex justify-center items-center bg-white rounded-md border border-black/20 shadow-md">
				<div className="w-1/5 px-3">
					<Link to="/" className="text-black text-lg">
						BookReview<span className="text-[12px]">.in</span>
					</Link>
				</div>
				<div className="w-4/5 flex justify-end px-3">
					<Link to="/" className={linkClass("/")}>
						Home
					</Link>
					<Link to="/sign-in" className={linkClass("/sign-in")}>
						Sign In
					</Link>
					<Link to="/sign-up" className={linkClass("/sign-up")}>
						Sign Up
					</Link>
					<ThemeToggle />
				</div>
			</div>
		</div>
	);
}
