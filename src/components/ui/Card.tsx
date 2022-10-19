export default function Card({ heading }: { heading: string }) {
	return (
		<section className="bg-zinc-800 w-60 px-4 py-4 m-2 rounded-md">
			<h1 className="text-slate-200 pb-2">{heading}</h1>
			<p className="text-slate-400">0 of 3 substasks</p>
		</section>
	);
}
