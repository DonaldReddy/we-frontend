import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	withCredentials: true,
});

// api.interceptors.response.use(
// 	(response) => response,
// 	(error) => {
// 		if (error.response?.status === 401) {
// 			store.dispatch(authActions.logoutUser());
// 			store.dispatch(userActions.clearUser());
// 		}
// 		return Promise.reject(error);
// 	},
// );

export { api };
