export default function BookCard({
	id,
	title,
	author,
	image,
	rating,
}: {
	id: string;
	title: string;
	author: string;
	image: string;
	rating: number;
}) {
	return (
		<div>
			<h2>{title}</h2>
			<p>Author: {author}</p>
			<img src={image} alt={title} />
			<p>Rating: {rating}</p>
		</div>
	);
}
