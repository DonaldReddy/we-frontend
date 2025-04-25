import { useAppDispatch } from "../../redux/store";
import { generalActions } from "../../redux/slices/generalSlice";

export default function ThemeToggle() {
	const dispatch = useAppDispatch();

	return (
		<label className="relative inline-flex items-center cursor-pointer">
			<input
				className="sr-only peer"
				type="checkbox"
				onChange={() => dispatch(generalActions.toggleTheme())}
			/>
			<div className="w-15 h-8 rounded-full bg-black/10  transition-all duration-500 after:content-['☀️'] after:absolute after:top-0.5 after:left-1 after:bg-white border border-black/30 after:rounded-full after:h-7 after:w-8 after:flex after:items-center after:justify-center after:transition-all after:duration-500 peer-checked:after:translate-x-5 peer-checked:after:content-['🌙'] peer-checked:after:bg-black after:shadow-md after:text-sm" />
		</label>
	);
}
