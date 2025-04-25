import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "./redux/store";
import useClient from "./hook/useClient";

export default function ProtectedRoute({
	access,
}: {
	access: "ADMIN" | "USER";
}) {
	const { isAuthenticated, user } = useAppSelector((state) => state.auth);
	const isClient = useClient();

	if (!isClient) return <div>Loading...</div>;

	if (!isAuthenticated) return <Navigate to="/sign-in" />;

	if (access === "ADMIN" && user?.role !== "ADMIN") {
		return <Navigate to="/" />;
	}

	return <Outlet />;
}
