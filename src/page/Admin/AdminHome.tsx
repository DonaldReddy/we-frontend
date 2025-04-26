import { useSearchParams } from "react-router-dom";
import BookFilter from "../../components/Admin/BookFilter";
import { useEffect, useState } from "react";
import BookCard from "../../components/Book/BookCard";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { adminActions } from "../../redux/slices/adminSlice";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import BookSkeleton from "../../components/Book/BookSkeleton";

export default function AdminHome() {
	const [searchParams, setSearchParams] = useSearchParams();
	const { isLoading } = useAppSelector((state) => state.admin);
	const { books, previousPage, currentPage, nextPage, limit } = useAppSelector(
		(state) => state.admin.books,
	);
	const dispatch = useAppDispatch();
	const [page, setPage] = useState(currentPage || 1);

	useEffect(() => {
		const timeOut = setTimeout(() => {
			dispatch(adminActions.fetchBooks());
		}, 500);
		return () => clearTimeout(timeOut);
	}, [searchParams]);

	useEffect(() => {
		if (page !== currentPage) {
			setSearchParams({ page: page.toString() });
		}
	}, [page]);

	return (
		<div className="min-h-dvh">
			<h1 className="text-6xl">Hello Admin,</h1>
			<p className="text-2xl">Welcome to the admin panel.</p>
			<div className="my-4  w-full ">
				<BookFilter />
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[80dvh]">
				{!isLoading &&
					books.map((book) => (
						<BookCard
							key={book.id}
							id={book.id}
							title={book.title}
							author={book.author}
							coverImage={book.coverImage}
							description={book.description}
							rating={book.rating}
							ratingCount={book.ratingCount}
							createdAt={new Date(book.createdAt)}
							featured={book.featured}
						/>
					))}

				{isLoading &&
					Array(limit)
						.fill(0)
						.map((_, index) => <BookSkeleton key={index} />)}

				{!isLoading && books.length === 0 && (
					<div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center min-h-[80dvh]">
						<p className="text-2xl">No books found</p>
					</div>
				)}
			</div>
			<div className="flex items-center justify-center gap-4 mt-5 pt-5">
				{previousPage && (
					<button
						className="bg-black text-white px-4 py-2 rounded flex items-center gap-2"
						onClick={() => setPage(previousPage)}
					>
						<FaArrowLeftLong />
						Prev
					</button>
				)}
				<p className="text-xl">Page: {page}</p>
				{nextPage && (
					<button
						className="bg-black text-white px-4 py-2 rounded flex items-center gap-2"
						onClick={() => setPage(nextPage)}
					>
						Next
						<FaArrowRightLong />
					</button>
				)}
			</div>
		</div>
	);
}
