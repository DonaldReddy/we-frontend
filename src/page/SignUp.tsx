import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAppDispatch } from "../redux/store";
import { authActions } from "../redux/slices/authSlice";

export default function SignIn() {
	const [userInfo, setUserInfo] = React.useState({
		email: "",
		password: "",
		name: "",
	});

	const [error, setError] = React.useState({
		email: "",
		password: "",
		name: "",
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

	const validateForm = () => {
		const currentError: any = {};
		if (userInfo.email === "") {
			currentError.email = "Email is required";
		}
		if (userInfo.password === "") {
			currentError.password = "Password is required";
		} else {
			// allow special characters in password
			const passwordRegex =
				/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+={}\[\]:;"'<>,.?~`-]{8,}$/;
			if (!passwordRegex.test(userInfo.password)) {
				currentError.password =
					"Password must be at least 8 characters long and contain at least one letter and one number";
			}
		}

		if (userInfo.name === "") {
			currentError.name = "Name is required";
		}

		setError(currentError);
		return Object.keys(currentError).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			console.log(userInfo);
			if (!validateForm()) {
				return;
			}
			console.log(userInfo);

			await api.post("/api/v1/auth/sign-up", userInfo);
			dispatch(authActions.login());
			router("/");
		} catch (error) {
			// TODO add tostify error message
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-[80dvh] w-full ">
			<div className="shadow-lg p-5 rounded-lg">
				<h1 className="text-4xl text-center font-bold mb-4">Sign Up</h1>
				<div>
					<form
						className="flex flex-col justify-center items-center space-y-3  w-[350px]"
						onSubmit={handleSubmit}
					>
						<input
							type="text"
							placeholder="Name"
							name="name"
							className="border border-gray-300 rounded p-2 w-full outline-none"
							value={userInfo.name}
							onChange={handleInputChange}
							required
						/>
						{error.name && <p className="text-red-500 text-sm">{error.name}</p>}
						<input
							type="email"
							placeholder="Email"
							name="email"
							className="border border-gray-300 rounded p-2 w-full outline-none"
							value={userInfo.email}
							onChange={handleInputChange}
							required
						/>
						{error.email && (
							<p className="text-red-500 text-sm">{error.email}</p>
						)}
						<input
							type="password"
							placeholder="Password"
							name="password"
							className="border border-gray-300 rounded p-2 w-full outline-none"
							value={userInfo.password}
							onChange={handleInputChange}
							required
						/>
						{error.password && (
							<p className="text-red-500 text-sm w-full">{error.password}</p>
						)}

						<button
							className="bg-black/80  hover:bg-black/100 text-white rounded p-2 w-full transition-all duration-400 cursor-pointer"
							type="submit"
						>
							Sign Up
						</button>
						<p className="text-sm text-gray-500">
							Already have an account?{" "}
							<Link to="/sign-in" className="text-black underline">
								Sign In
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
}
