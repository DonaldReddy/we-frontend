import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { RxExit } from "react-icons/rx";
import { authActions } from "../../redux/slices/authSlice";
import { FaRegUserCircle } from "react-icons/fa";

export default function NavBar() {
	const location = useLocation();
	const { isAuthenticated, user } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	const linkClass = (path: string) =>
		`px-3  m-1 text-black/60 hover:scale-110 hover:text-black/100 transition-all duration-200 ${
			location.pathname === path ? "text-black/100 underline" : ""
		}`;

	const handleLogout = () => {
		console.log("Logout clicked");

		dispatch(authActions.logout());
	};

	return (
		<div className="p-3 max-w-screen-2xl fixed top-0 left-0 right-0 z-10">
			<div className="h-10 w-full flex justify-center items-center bg-white rounded-md border border-black/20 shadow-md">
				<div className="w-1/5 px-3">
					<Link to="/" className="text-black text-lg">
						BookReview<span className="text-[12px]">.in</span>
					</Link>
				</div>
				<div className="w-4/5 flex items-center justify-end px-3">
					<Link to="/" className={linkClass("/")}>
						Home
					</Link>

					{isAuthenticated && (
						<Link to="/app/books" className={linkClass("/app/books")}>
							Books
						</Link>
					)}

					{!isAuthenticated && (
						<Link to="/sign-in" className={linkClass("/sign-in")}>
							Sign In
						</Link>
					)}
					{!isAuthenticated && (
						<Link to="/sign-up" className={linkClass("/sign-up")}>
							Sign Up
						</Link>
					)}

					{isAuthenticated && user.role === "ADMIN" && (
						<Link to="/admin" className={linkClass("/admin")}>
							Manage Books
						</Link>
					)}

					{/* <ThemeToggle /> */}
					{isAuthenticated && (
						<>
							<Link
								to={`/app/profile/${user.id}`}
								className={linkClass(`/app/profile/${user.id}`)}
							>
								<FaRegUserCircle
									className=" text-black/60 hover:scale-105 hover:text-black/100 transition-all duration-200 cursor-pointer"
									size={25}
								/>
							</Link>

							<RxExit
								className="ml-2 text-black/60 hover:scale-105 hover:text-black/100 transition-all duration-200 cursor-pointer"
								size={25}
								onClick={handleLogout}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
