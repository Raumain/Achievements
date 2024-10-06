import { createFileRoute } from "@tanstack/react-router";
import { convex } from "../main";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

export const Route = createFileRoute("/_auth/achievements/$id")({
	component: () => <Achievement />,
	loader: async ({ params: { id } }) => {
		try {
			const achievement = await convex.query(
				api.handlers.achievements.getById,
				{
					id: id as Id<"achievements">,
				},
			);
			const boxes = await convex.query(api.handlers.boxes.getAll, {
				achievementId: id as Id<"achievements">,
			});
			return { achievement, boxes };
		} catch (e) {
			console.error("Error fetching achievement:", e);
			throw new Error("Error fetching achievement");
		}
	},
});

const Achievement = () => {
	const { achievement, boxes } = Route.useLoaderData();

	if (!achievement || !boxes) return <div>loading... </div>;
	return (
		<div className="px-8">
			<h1 className="font-bold text-2xl text-center capitalize">
				{achievement?.name}
			</h1>
			<p className="py-4">{achievement?.description}</p>
			<div className="flex flex-wrap gap-2">
				{boxes.map((box, i) => (
					<div key={box._id} className="tooltip" data-tip={box.date}>
						<div
							style={{ backgroundColor: box.color }}
							className="flex flex-col justify-center items-center border-slate-500 border rounded w-10 h-10"
						>
							<small>{i + 1}</small>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
