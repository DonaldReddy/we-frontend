import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { userBookActions } from "../../redux/slices/userBookSlice";
import BookCard from "../Book/BookCard";
import BookSkeleton from "../Book/BookSkeleton";

export default function FeaturedBooks() {
	const { isLoading, featuredBooks } = useAppSelector(
		(state) => state.userBook,
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (featuredBooks.length > 0) return;
		dispatch(userBookActions.fetchFeaturedBooks());
	}, []);

	return (
		<div>
			<h2 className="text-3xl font-bold  mb-4 bg-gradient-to-r from-blue-500 to-10% to-pink-400 bg-clip-text text-transparent">
				Featured Books
			</h2>
			<div className="flex flex-wrap gap-4 mt-4">
				{featuredBooks.map((book) => (
					<BookCard
						key={book.id}
						id={book.id}
						title={book.title}
						author={book.author}
						coverImage={book.coverImage}
						rating={book.rating}
						description={book.description}
						ratingCount={book.ratingCount}
						featured={book.featured}
						createdAt={book.createdAt}
					/>
				))}
				{isLoading &&
					Array(4)
						.fill(0)
						.map((_, index) => <BookSkeleton key={index} />)}
			</div>
		</div>
	);
}
