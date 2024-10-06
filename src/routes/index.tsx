import { createFileRoute } from "@tanstack/react-router";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Menu } from "../components/Menu";
import { AuthButton } from "../components/AuthButton";
import type { Id } from "../../convex/_generated/dataModel";

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

function HomeComponent() {
	// NOTES :  This page is useless ATM, should be a landing page
	const { isAuthenticated } = useConvexAuth();
	const boxes = useQuery(api.handlers.boxes.getAll, {
		achievementId: "k97bwy2868pqrnm944ze3h7s2x71n75m" as Id<"achievements">,
	});
	const user = useQuery(api.handlers.users.get);
	return (
		<div className="p-2 h-full overflow-y-auto">
			<Menu />
			<AuthButton isLogged={isAuthenticated} />
			<div className="flex flex-col items-center p-4">
				<h1 className="font-bold text-4xl">Welcome to Achievements</h1>
				{user && (
					<div className="flex flex-col items-center p-4">
						<h2 className="font-bold text-2xl">Welcome, {user.name}</h2>
						<img src={user.image} alt="" className="rounded-full w-20 h-20" />
					</div>
				)}
			</div>
			<div className="flex justify-center items-center px-16 py-4">
				<div className="flex flex-wrap items-center gap-4">
					{boxes?.map(({ _id, color, date }) => (
						<div
							key={_id}
							style={{ backgroundColor: color }}
							className="flex flex-col justify-center items-center border-slate-500 border rounded w-12 h-12"
						>
							{/* <p>{date}</p> */}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
