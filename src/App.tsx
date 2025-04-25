import {
	createBrowserRouter,
	RouterProvider,
	Route,
	createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout";
import ReduxProvider from "./redux/ReduxProvider";
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route path="sign-in" element={<SignIn />} />
			<Route path="sign-up" element={<SignUp />} />
		</Route>,
	),
);

function App() {
	return (
		<ReduxProvider>
			<RouterProvider router={router} />
		</ReduxProvider>
	);
}

export default App;
