export default function Card({ heading }: { heading: string }) {
	return (
		<section className="bg-zinc-800/50 backdrop-blur-sm w-60 p-4 my-4 rounded-md">
			<h1 className="text-slate-200 pb-2 ">{heading}</h1>
			<p className="text-slate-400">0 of 3 substasks</p>
		</section>
	);
}
