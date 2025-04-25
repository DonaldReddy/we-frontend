import { createSlice } from "@reduxjs/toolkit";

interface GeneralState {
	theme: "light" | "dark";
}

const initialState: GeneralState = {
	theme: "light",
};

const generalSlice = createSlice({
	name: "general",
	initialState,
	reducers: {
		toggleTheme: (state) => {
			state.theme = state.theme === "light" ? "dark" : "light";
		},
	},
});

export const generalActions = {
	...generalSlice.actions,
};

export const generalReducer = generalSlice.reducer;
