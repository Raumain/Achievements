import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

function HomeComponent() {
	const boxes = useQuery(api.running.get);
	return (
		<div className="p-2">
			<div className="flex justify-center items-center p-24">
				<div className="place-items-center gap-4 grid grid-cols-7 grid-rows-8">
					{boxes?.map(({ _id, isFilled, weekNumber }) => (
						<div
							key={_id}
							className={`flex flex-col justify-center items-center border-slate-500 border rounded w-12 h-12 ${isFilled ? "bg-slate-500" : ""}`}
						>
							<p>{weekNumber}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
