import React from "react";
import { FaStar } from "react-icons/fa";
import { Book } from "../../types";
import { api } from "../../api";
import Loader from "../Loader";

export default function ReviewForm({
	book,
	handleClose,
}: {
	book: Book;
	handleClose: () => void;
}) {
	const [reviewInfo, setReviewInfo] = React.useState({
		rating: 5,
		comment: "",
		aiComment: "",
	});

	const [aiLoading, setAiLoading] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);

	const reWriteWithAI = async () => {
		try {
			setAiLoading(true);
			const { data } = await api.post("/api/v1/reviews/refine", {
				comment: reviewInfo.comment,
				bookTitle: book.title,
				bookAuthor: book.author,
			});
			setReviewInfo({ ...reviewInfo, aiComment: data.refinedComment });
		} catch (error) {
			console.error("Error refining comment:", error);
		} finally {
			setAiLoading(false);
		}
	};

	const handleSubmit = async () => {
		try {
			setIsLoading(true);

			await api.post(`/api/v1/reviews?bookId=${book.id}`, {
				rating: reviewInfo.rating,
				comment: reviewInfo.aiComment || reviewInfo.comment,
			});
			handleClose();
		} catch (error) {
			console.error("Error submitting review:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-white p-4 rounded-lg shadow-md w-3/4 sm:w-1/2 lg:w-2/3 h-3/4">
				<h2 className="text-xl mb-4">
					Writing Review for "{book.title}" by {book.author}
				</h2>
				<textarea
					className="w-full  p-2 border rounded outline-none resize-none"
					placeholder="Your review... at least 30 words"
					rows={10}
					value={reviewInfo.aiComment || reviewInfo.comment}
					onChange={(e) => {
						if (reviewInfo.aiComment) {
							setReviewInfo({ ...reviewInfo, aiComment: e.target.value });
						} else {
							setReviewInfo({ ...reviewInfo, comment: e.target.value });
						}
					}}
					required
				></textarea>
				<div className="flex items-center gap-2 my-2">
					{Array(reviewInfo.rating)
						.fill(null)
						.map((_, index) => (
							<span
								key={index}
								className="text-sm text-[#de7921] cursor-pointer"
							>
								<FaStar
									onClick={() => {
										console.log(reviewInfo.rating == index + 1);

										if (reviewInfo.rating == index + 1) {
											setReviewInfo({ ...reviewInfo, rating: 1 });
										} else setReviewInfo({ ...reviewInfo, rating: index + 1 });
									}}
									size={reviewInfo.rating == index + 1 ? 25 : 20}
								/>
							</span>
						))}
					{Array(5 - reviewInfo.rating)
						.fill(null)
						.map((_, index) => (
							<span
								key={index}
								className="text-sm text-gray-500 cursor-pointer"
							>
								<FaStar
									onClick={() =>
										setReviewInfo({
											...reviewInfo,
											rating: index + 1 + reviewInfo.rating,
										})
									}
									size={
										reviewInfo.rating == index + 1 + reviewInfo.rating ? 25 : 20
									}
								/>
							</span>
						))}
					<p className="text-2xl">
						{" "}
						{reviewInfo.rating <= 2
							? "😶"
							: reviewInfo.rating <= 3
							? "😐"
							: reviewInfo.rating <= 4
							? "😊"
							: "🤩"}
					</p>
				</div>
				<div className="flex justify-end mt-4">
					{reviewInfo.comment.split(" ").length < 30 && (
						<p className=" text-white py-2 px-4 rounded mr-2 animated-background bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-500 ">
							Write{" "}
							{30 -
								(reviewInfo.comment
									? reviewInfo.comment.split(" ").length
									: 0)}{" "}
							more words to Rewrite with AI{" "}
							<span className="text-black text-2xl">🤖</span>
						</p>
					)}
					{reviewInfo.comment.split(" ").length >= 30 && (
						<button
							className=" text-white py-2 px-4 rounded mr-2 animated-background bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-500 cursor-pointer"
							onClick={reWriteWithAI}
							disabled={aiLoading}
						>
							<span className={aiLoading ? "animate-pulse" : ""}>
								{aiLoading ? (
									<div className="flex items-center gap-2">
										<Loader />
										Refining with AI
									</div>
								) : (
									"Refine With AI"
								)}
							</span>
						</button>
					)}
					<button
						className="bg-white text-black py-2 px-4 rounded mr-2 border cursor-pointer"
						onClick={handleClose}
						disabled={isLoading || aiLoading}
					>
						Cancel
					</button>
					<button
						className="bg-black text-white py-2 px-4 rounded cursor-pointer"
						disabled={
							isLoading ||
							aiLoading ||
							reviewInfo.comment.split(" ").length < 30
						}
						onClick={handleSubmit}
					>
						{isLoading ? <Loader /> : "Submit"}
					</button>
				</div>
			</div>
		</div>
	);
}
