import { FaStar } from "react-icons/fa";

export default function BookCard({
	id,
	title,
	author,
	coverImage,
	description,
	rating,
	ratingCount,
	createdAt,
}: {
	id: string;
	title: string;
	author: string;
	coverImage: string;
	description: string;
	rating: number;
	ratingCount: number;
	createdAt: Date;
}) {
	return (
		<div className=" p-4 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 max-w-[300px] bg-blue-50 cursor-pointer">
			<h2 className="text-lg">{title.slice(0, 50)}</h2>
			<img src={coverImage} alt={title} className="w-[150px] h-[200px]" />
			<p>By {author}</p>
			<div className="flex items-center gap-2 ">
				<p>Rating: {rating}</p>
				{Array(rating)
					.fill(null)
					.map((_, index) => (
						<span key={index} className="text-sm text-[#de7921]">
							<FaStar />
						</span>
					))}
				{Array(5 - rating)
					.fill(null)
					.map((_, index) => (
						<span key={index} className="text-sm text-gray-500">
							<FaStar />
						</span>
					))}
			</div>
			<p>Description: {description.slice(0, 100)}...</p>
			<p>Added At: {createdAt.toDateString()}</p>
		</div>
	);
}
