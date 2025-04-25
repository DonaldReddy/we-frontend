import { useSearchParams } from "react-router-dom";
import BookFilter from "../../components/Admin/BookFilter";
import { api } from "../../api";
import { useEffect, useState } from "react";
import BookCard from "../../components/Book/BookCard";

export default function AdminHome() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [books, setBooks] = useState<
		{
			id: string;
			title: string;
			author: string;
			coverImage: string;
			description: string;
			rating: number;
			ratingCount: number;
			createdAt: Date;
		}[]
	>([]);

	const fetchBooks = async () => {
		try {
			const { data } = await api.get(
				"/api/v1/books?" + searchParams.toString(),
			);
			setBooks(data.books);
		} catch (error) {
			console.error("Error fetching books:", error);
		}
	};

	useEffect(() => {
		const timeOut = setTimeout(() => {
			fetchBooks();
		}, 1000);
		return () => clearTimeout(timeOut);
	}, [searchParams]);

	return (
		<div className="min-h-dvh">
			<h1 className="text-6xl">Hello Admin,</h1>
			<p className="text-2xl">Welcome to the admin panel.</p>
			<div className="my-4  w-full ">
				<BookFilter />
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{books.map((book) => (
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
					/>
				))}
			</div>
		</div>
	);
}
