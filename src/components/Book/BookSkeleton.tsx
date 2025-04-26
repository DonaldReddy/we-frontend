export default function BookSkeleton() {
	return (
		<div className="flex flex-col  justify-center p-4 rounded-lg shadow-md bg-blue-50 w-[300px]  animated-background bg-gradient-to-r from-blue-200 via-blue-300 to-indigo-200">
			<div className="animate-pulse w-full h-[30px] bg-white rounded-lg mb-2"></div>
			<div className="animate-pulse w-full h-[280px] bg-white rounded-lg mb-2"></div>
			<div className="animate-pulse w-[120px] h-[20px] bg-white rounded-lg mb-2"></div>
			<div className="animate-pulse w-full h-[30px] bg-white rounded-lg mb-2"></div>
		</div>
	);
}
