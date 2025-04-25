import { FaFilter, FaPlus, FaSort } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import AddNewBook from "./AddNewBook";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function BookFilter() {
	const [searchParams, setSearchParams] = useSearchParams();

	const [showAddNewBook, setShowAddNewBook] = useState(false);
	const [search, setSearch] = useState(searchParams.get("search") || "");
	const [sortBy, setSortBy] = useState(searchParams.get("sortby") || "");
	const [filter, setFilter] = useState(searchParams.get("filter") || "");
	const [page, setPage] = useState(parseInt(searchParams.get("page")!) || 1);
	const [limit, setLimit] = useState(
		parseInt(searchParams.get("limit")!) || 10,
	);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		if (search) params.set("search", search);
		else params.delete("search");
		if (sortBy) params.set("sortby", sortBy);
		else params.delete("sortby");
		if (filter) params.set("filter", filter);
		else params.delete("filter");
		if (page) params.set("page", page.toString());
		else params.delete("page");
		if (limit) params.set("limit", limit.toString());
		else params.delete("limit");
		setSearchParams(params);
	}, [search, sortBy, filter, page, limit]);

	return (
		<div className="w-full flex items-center justify-between bg-white/80 p-2 rounded-lg shadow-md">
			<div className="flex items-center gap-2">
				<div className="flex items-center border-black/20 border rounded-lg px-2">
					<label className="text-lg font-semibold" htmlFor="search">
						<IoIosSearch />
					</label>
					<input
						type="text"
						name="search"
						placeholder="Search book title..."
						className=" rounded-lg p-2 ml-2 outline-none"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								// Handle search logic here
							}
						}}
					/>
				</div>
				<div className="flex items-center border-black/20 border rounded-lg px-2">
					<label className="text-lg font-semibold" htmlFor="sortby">
						<FaSort />
					</label>
					<select
						name="sortby"
						defaultValue=""
						className="rounded-lg p-2 ml-2 outline-none"
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value)}
					>
						<option value="" disabled>
							Sort By
						</option>

						<option value="title">Title</option>
						<option value="author">Author</option>
						<option value="date">Date</option>
						<option value="rating">Rating</option>
					</select>
				</div>
				<div className="flex items-center border-black/20 border rounded-lg px-2">
					<label className="text-lg font-semibold" htmlFor="filter">
						<FaFilter />
					</label>
					<select
						name="sortby"
						defaultValue=""
						className="rounded-lg p-2 ml-2 outline-none"
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
					>
						<option value="" disabled>
							Filter
						</option>

						<option value="rating=4">rating &gt; 4</option>
						<option value="rating=3">rating &gt; 3</option>
						<option value="rating=2">rating &gt; 2</option>
						<option value="rating=1">rating &gt; 1</option>
					</select>
				</div>
				<div className="flex items-center border-black/20 border rounded-lg px-2">
					<label className="text-sm " htmlFor="limit">
						Items per page :
					</label>

					<input
						type="number"
						name="limit"
						id="limit"
						min={10}
						max={20}
						defaultValue={10}
						placeholder="Limit results..."
						className=" rounded-lg p-2  outline-none"
						value={limit}
						onChange={(e) => {
							if (e.target.value.length > 0) {
								setLimit(parseInt(e.target.value));
							}
						}}
					/>
				</div>
				<button
					className="text-black py-2 px-3 rounded-xl flex items-center gap-2 hover:bg-black/100 hover:text-white transition-all duration-200 cursor-pointer border border-black/40"
					onClick={() => {
						setSearch("");
						setSortBy("");
						setFilter("");
						setPage(1);
						setLimit(10);
					}}
				>
					Clear all filters
				</button>
			</div>
			<div>
				{showAddNewBook && (
					<AddNewBook handleClose={() => setShowAddNewBook(false)} />
				)}
				<button
					className=" text-black py-2 px-3 rounded-xl flex items-center gap-2 hover:bg-black/100 hover:text-white transition-all duration-200 cursor-pointer border border-black/40"
					onClick={() => setShowAddNewBook(true)}
				>
					Add new book <FaPlus />
				</button>
			</div>
		</div>
	);
}
