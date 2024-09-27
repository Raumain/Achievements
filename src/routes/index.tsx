import { createFileRoute } from "@tanstack/react-router";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Menu } from "../components/Menu";
import { AuthButton } from "../components/AuthButton";

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

function HomeComponent() {
	const { isAuthenticated } = useConvexAuth();
	const boxes = useQuery(api.running.get);
	const user = useQuery(api.users.get);
	return (
		<div className="p-2">
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
