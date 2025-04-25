import { useEffect, useState } from "react";
import { api } from "../../api";

export default function FeaturedBooks() {
	const [loading, setLoading] = useState(true);
	const [books, setBooks] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const response = await api.get("/api/v1/books/featured");
				setBooks(response.data);
			} catch (error) {
				console.error("Error fetching featured books:", error);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	return (
		<div>
			<h2 className="text-3xl font-bold  mb-4 bg-gradient-to-r from-blue-500 to-10% to-pink-400 bg-clip-text text-transparent">
				Featured Books
				<div className="flex flex-wrap gap-4 mt-4"></div>
			</h2>
		</div>
	);
}
