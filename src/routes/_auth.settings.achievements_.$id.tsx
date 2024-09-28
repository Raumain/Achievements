import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

export const Route = createFileRoute("/_auth/settings/achievements/$id")({
	component: () => <Dashboard />,
});

type AchievementUpdate = {
	name: string;
	description: string;
	category: string;
};

const Dashboard = () => {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const achievement = useQuery(api.handlers.achievements.getById, {
		id: id as Id<"achievements">,
	});
	const updateAchievement = useMutation(api.handlers.achievements.update);
	const deleteAchievement = useMutation(api.handlers.achievements.deleteById);

	const handleUpdate = ({
		id,
		updatedData,
	}: {
		id: Id<"achievements">;
		updatedData: AchievementUpdate;
	}) => {
		updateAchievement({ id, achievement: { ...updatedData } });
	};

	const handleDelete = (id: Id<"achievements">) => {
		if (
			window.confirm("Êtes-vous sûr de vouloir supprimer cette réalisation ?")
		) {
			deleteAchievement({ id });
		}
	};

	if (!achievement) return <></>;
	return (
		<div className="mx-auto px-4 py-8 container">
			<h1 className="mb-8 font-bold text-3xl text-center">
				{achievement.name}
			</h1>
			<div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				<div className="bg-base-100 shadow-xl card">
					<div className="card-body">
						<form
							onSubmit={(e) => {
								e.preventDefault();
								const formData = new FormData(e.currentTarget);
								const name = formData.get("name") as string;
								const description = formData.get("description") as string;
								const category = formData.get("category") as string;
								handleUpdate({
									id: id as Id<"achievements">,
									updatedData: { name, description, category },
								});
							}}
						>
							<input
								name="name"
								defaultValue={achievement.name}
								className="mb-2 input-bordered w-full input"
							/>
							<textarea
								name="description"
								defaultValue={achievement.description}
								className="mb-2 textarea-bordered w-full textarea"
							/>
							<input
								name="category"
								defaultValue={achievement.category}
								className="mb-2 input-bordered w-full input"
							/>
							<div className="flex justify-between">
								<button type="submit" className="btn btn-primary">
									Sauvegarder
								</button>
								<button
									type="button"
									className="btn"
									onClick={() => {
										navigate({ to: "/settings/achievements" });
									}}
								>
									Annuler
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
