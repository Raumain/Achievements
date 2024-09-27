import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/_auth/settings/dashboard")({
	component: () => <Dashboard />,
});

const Dashboard = () => {
	const user = useQuery(api.users.get);
	const achievements = useQuery(api.achievements.getAll, {
		userId: user?._id ?? "",
	});

	return (
		<div className="mx-auto px-4 py-8 container">
			<h1 className="mb-8 font-bold text-3xl text-center">Vos Réalisations</h1>
			<div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{achievements?.map((achievement) => (
					<Link
						key={achievement._id}
						to="/settings/dashboard/$id"
						params={{ id: achievement._id }}
						className="bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 card"
					>
						<div className="card-body">
							<h2 className="card-title">{achievement.name}</h2>
							<p>{achievement.description}</p>
							<div className="flex justify-between items-center mt-4">
								<span className="badge badge-primary">
									{/* {achievement.category} */}
									category
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
