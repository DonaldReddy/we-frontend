import spark from "../assets/spark.svg";
import FeaturedBooks from "../components/Home/FeaturedBooks";

export default function Home() {
	return (
		<div className=" w-full min-h-dvh">
			<div className="h-[60dvh] md:h-[80dvh] flex flex-col items-center justify-center bg-gradient-to-r from-violet-200 to-yellow-100/60 rounded-2xl ">
				<div className="flex items-center justify-center gap-3 ">
					<h1 className="text-4xl md:text-6xl bg-gradient-to-r from-blue-500 to-pink-400 bg-clip-text text-transparent">
						Book Review Taken to Next level with AI
					</h1>
					<img src={spark} className="text-yellow-50 relative bottom-4" />
				</div>
				<div className="flex flex-col items-center justify-center mt-4 space-y-2">
					<p className="text-lg text-center md:text-left">
						Explore the latest reviews and insights powered by AI.
					</p>
					<p className="text-md text-center md:text-left">
						Join us in discovering your next favorite book!
					</p>
				</div>
			</div>

			<div className="mt-20">
				<FeaturedBooks />
			</div>
		</div>
	);
}
