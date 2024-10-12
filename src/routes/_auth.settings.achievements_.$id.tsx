import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { useState, type FormEvent } from "react";
import ColorInput from "../components/ColorPicker";

export const Route = createFileRoute("/_auth/settings/achievements/$id")({
	component: () => <Dashboard />,
});

const Dashboard = () => {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const achievement = useQuery(api.handlers.achievements.getById, {
		id: id as Id<"achievements">,
	});

	const updateAchievement = useMutation(api.handlers.achievements.update);
	const deleteAchievement = useMutation(api.handlers.achievements.deleteById);

	const [colors, setColors] = useState<Map<number, string>>(new Map());
	if (!achievement) return <></>;

	const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const name = formData.get("name") as string;
		const description = formData.get("description") as string;
		const category = formData.get("category") as string;
		const startDate = formData.get("startDate") as string;
		const endDate = formData.get("endDate") as string;
		const boxColor =
			colors.size !== 0 ? Array.from(colors.values()) : achievement?.boxColor;
		updateAchievement({
			id: id as Id<"achievements">,
			achievement: {
				name,
				description,
				category,
				startDate,
				endDate,
				boxColor,
			},
		}).then(() => {
			navigate({ to: "/settings/achievements" });
		});
	};

	const handleDelete = () => {
		if (
			window.confirm("Êtes-vous sûr de vouloir supprimer cette réalisation ?")
		) {
			deleteAchievement({ id: achievement?._id }).then(() => {
				navigate({ to: "/settings/achievements" });
			});
		}
	};

	return (
		<div className="mx-auto px-4 py-8 container">
			<h1 className="mb-8 font-bold text-3xl text-center">
				{achievement.name}
			</h1>
			<div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				<div className="bg-base-100 shadow-xl card">
					<div className="card-body">
						<form onSubmit={handleUpdate}>
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
							<label
								htmlFor="endDate"
								className="input-bordered w-full pl-3 pr-0 py-3 flex items-center justify-between input mb-2"
							>
								<span className="">Start date :</span>
								<input
									name="startDate"
									type="date"
									defaultValue={achievement.startDate}
									className="input text-right"
								/>
							</label>
							<label
								htmlFor="endDate"
								className="input-bordered w-full pl-3 pr-0 py-3 flex items-center justify-between input mb-2"
							>
								<span className="">End date :</span>
								<input
									name="endDate"
									type="date"
									defaultValue={achievement.endDate}
									className="input text-right"
								/>
							</label>
							<div className="mb-2">
								<span className="form-label">Couleur</span>
								<div className="flex gap-2">
									{achievement.boxColor.map((color, i) => (
										<ColorInput
											key={color}
											initialColor={color}
											onChange={(e) => {
												const newColors = new Map(
													colors.size === 0
														? achievement.boxColor.map((color, index) => [
																index,
																color,
															])
														: colors,
												);
												newColors.set(i, e);
												setColors(newColors);
											}}
										/>
									))}
								</div>
							</div>
							<div className="flex items-center justify-between">
								<button
									type="button"
									className="btn bg-red-400 text-white"
									onClick={handleDelete}
								>
									Delete
								</button>
								<div className="join">
									<button
										type="button"
										className="btn join-item min-w-20"
										onClick={() => {
											navigate({ to: "/settings/achievements" });
										}}
									>
										Cancel
									</button>
									<button
										type="submit"
										className="btn join-item min-w-20 btn-primary"
									>
										Save
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
