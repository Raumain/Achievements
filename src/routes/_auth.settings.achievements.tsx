import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { PlusIcon } from "../assets/icons";

export const Route = createFileRoute("/_auth/settings/achievements")({
	component: () => <Dashboard />,
});

const Dashboard = () => {
	const user = useQuery(api.handlers.users.get);
	const achievements = useQuery(api.handlers.achievements.getAll, {
		userId: user?._id ?? "",
	});

	return (
		<div className="p-8 xl:!max-w-full container">
			<div className="flex justify-between items-center mb-6 px-2">
				<h1 className="font-bold text-3xl">Your achievements</h1>
				<Link to="/settings/achievements/create" className="btn btn-primary">
					<PlusIcon /> <span>Create</span>
				</Link>
			</div>
			<div className="flex flex-col space-y-6">
				{achievements?.map((achievement) => (
					<Link
						key={achievement._id}
						to="/settings/achievements/$id"
						params={{ id: achievement._id }}
						className="bg-base-100 shadow-xl hover:shadow-2xl w-full transform transition-all duration-300 card ease-in-out hover:scale-105"
					>
						<div className="card-body">
							<h2 className="card-title">{achievement.name}</h2>
							<p>{achievement.description}</p>
							<div className="flex justify-between items-center mt-4">
								<span className="badge badge-primary">
									{achievement.category}
								</span>
								<span className="text-gray-500 text-sm">
									{new Date(achievement._creationTime).toLocaleDateString()}
								</span>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};
