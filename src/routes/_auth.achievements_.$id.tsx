import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "convex/react";
import { useRef } from "react";
import { api } from "../../convex/_generated/api";
import type { Doc, Id } from "../../convex/_generated/dataModel";
import { boxColor } from "../helpers/boxColor";
import { convex } from "../main";

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

			return { achievement };
		} catch (e) {
			console.error("Error fetching achievement:", e);
			throw new Error("Error fetching achievement");
		}
	},
});

const Achievement = () => {
	const { achievement } = Route.useLoaderData();
	const boxes = useQuery(api.handlers.boxes.getAll, {
		achievementId: Route.useParams().id as Id<"achievements">,
	});
	if (!achievement || !boxes) return <div>loading... </div>;
	return (
		<div className="px-8">
			<h1 className="font-bold text-2xl text-center capitalize">
				{achievement?.name}
			</h1>
			<p className="py-4">{achievement?.description}</p>
			<div className="flex flex-wrap gap-2">
				{boxes.map((box, i) =>
					box.date <= new Date().toISOString().split("T")[0] ? (
						<BoxDrawer key={box._id} box={box} i={i + 1} />
					) : (
						<SimpleBox key={box._id} box={box} i={i + 1} />
					),
				)}
			</div>
		</div>
	);
};

const SimpleBox = ({ box, i }: { box: Doc<"boxes">; i: number }) => (
	<div className="tooltip" data-tip={box.date}>
		<div
			style={{
				backgroundColor: boxColor(box).color,
			}}
			className="relative flex flex-col justify-center items-center border-slate-500 border rounded w-10 h-10"
		>
			<small>{i}</small>
		</div>
	</div>
);

const BoxDrawer = ({ box, i }: { box: Doc<"boxes">; i: number }) => {
	const { achievement } = Route.useLoaderData();

	const updateBox = useMutation(api.handlers.boxes.update);

	const checkboxRef = useRef<HTMLInputElement | null>(null);

	return (
		<div className="tooltip" data-tip={box.date}>
			<div className="drawer">
				<input
					ref={checkboxRef}
					id={`drawer-${i}`}
					type="checkbox"
					className="drawer-toggle"
				/>
				<div className="drawer-content">
					<label
						style={{
							backgroundColor: boxColor(box).color,
						}}
						htmlFor={`drawer-${i}`}
						className="flex flex-col justify-center items-center border-slate-500 border rounded w-10 h-10 cursor-pointer drawer-button"
					>
						<small>{i}</small>
					</label>
				</div>
				<div className="z-10 items-center align-middle drawer-side">
					<label
						htmlFor={`drawer-${i}`}
						aria-label="close sidebar"
						className="drawer-overlay"
					/>
					<div className="gap-2 bg-base-200 p-4 rounded-r w-80 h-24 text-base-content menu">
						<p>
							Day n° {i} - {box.date}
						</p>
						<div className="flex justify-center items-center gap-2">
							{achievement?.boxColor.map((color, i) => (
								<button
									key={color}
									type="button"
									style={{ backgroundColor: achievement?.boxColor.at(i) }}
									className="p-2 w-16 !h-8 !min-h-8 btn"
									onClick={() => {
										updateBox({
											id: box._id,
											box: {
												content: "",
												color: achievement?.boxColor.at(i),
											},
										}).then(() => checkboxRef.current?.click());
									}}
								>
									{i === 0
										? "Failed"
										: i === achievement.boxColor.length - 1
											? "Success"
											: "Partial"}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
