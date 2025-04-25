import { Outlet } from "react-router";
import NavBar from "./components/NavBar/NavBar";

export default function Layout() {
	return (
		<div className="bg-blue-200/40 min-h-dvh max-w-screen-2xl flex flex-col items-center text-black">
			<NavBar />
			<div className=" my-15 h-full w-full px-5">{<Outlet />}</div>
		</div>
	);
}
