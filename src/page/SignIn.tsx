import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAppDispatch } from "../redux/store";
import { authActions } from "../redux/slices/authSlice";

export default function SignIn() {
	const [userInfo, setUserInfo] = React.useState({
		email: "",
		password: "",
	});
	const router = useNavigate();
	const dispatch = useAppDispatch();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserInfo((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			await api.post("/api/v1/auth/sign-in", userInfo);
			dispatch(authActions.login());
			router("/");
		} catch (error) {
			// TODO add tostify error message
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-[80dvh] w-full ">
			<div className="shadow-lg p-5 rounded-lg">
				<h1 className="text-4xl text-center font-bold mb-4">Sign In</h1>
				<div>
					<form
						className="flex flex-col justify-center items-center space-y-3 w-[350px]"
						onSubmit={handleSubmit}
					>
						<input
							type="email"
							placeholder="Email"
							name="email"
							className="border border-gray-300 rounded p-2 w-full outline-none"
							value={userInfo.email}
							onChange={handleInputChange}
							required
						/>

						<input
							type="password"
							placeholder="Password"
							name="password"
							className="border border-gray-300 rounded p-2 w-full outline-none"
							value={userInfo.password}
							onChange={handleInputChange}
							required
						/>

						<button className="w-full text-black/70 text-right text-xs underline cursor-pointer">
							Forgot Password?
						</button>
						<button
							className="bg-black/80  hover:bg-black/100 text-white rounded p-2 w-full transition-all duration-400 cursor-pointer"
							type="submit"
						>
							Sign In
						</button>
						<p className="text-sm text-gray-500">
							Don't have an account?{" "}
							<Link to="/sign-up" className="text-black underline">
								Sign Up
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
}
