import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import ColorPicker from "../components/ColorPicker";

export const Route = createFileRoute("/_auth/settings/achievements/create")({
	component: () => <CreateAchievement />,
});

const CreateAchievement = () => {
	const navigate = useNavigate();
	const createAchievement = useMutation(api.handlers.achievements.create);
	const [loading, setLoading] = useState(false);
	const [colors, setColors] = useState(["#b02b2b", "#018729"]);
	console.log(colors);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		const formData = new FormData(e.currentTarget);
		const name = formData.get("name") as string;
		const description = formData.get("description") as string;
		const category = formData.get("category") as string;
		const timeInterval = formData.get("timeInterval") as
			| "day"
			| "week"
			| "month";
		const startDate = formData.get("startDate") as string;
		const endDate = formData.get("endDate") as string;
		const boxColor = colors;

		try {
			await createAchievement({
				name,
				description,
				category,
				timeInterval,
				startDate,
				endDate,
				boxColor,
				isPinned: false,
			});
			navigate({ to: "/settings/achievements" });
		} catch (error) {
			console.error("Error creating achievement:", error);
			setLoading(false);
		}
	};

	const addColor = () => {
		const lastColor = colors[colors.length - 1];
		setColors([...colors.slice(0, -1), "#FFFFFF", lastColor]);
	};

	const removeColor = () => {
		if (colors.length > 2) {
			setColors(colors.slice(0, -2).concat(colors[colors.length - 1]));
		}
	};

	return (
		<div className="mx-auto px-4 py-8 h-full container">
			<h1 className="mb-8 font-bold text-3xl text-center">
				Create a new tracker
			</h1>
			<form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
				<div className="form-control mb-4">
					<label className="label" htmlFor="name">
						<span className="label-text">Name</span>
					</label>
					<input
						type="text"
						id="name"
						name="name"
						className="input-bordered w-full input"
						required
					/>
				</div>

				<div className="form-control mb-4">
					<label className="label" htmlFor="description">
						<span className="label-text">Description</span>
					</label>
					<textarea
						id="description"
						name="description"
						className="textarea-bordered w-full textarea"
						required
					/>
				</div>

				<div className="form-control mb-4">
					<label className="label" htmlFor="category">
						<span className="label-text">Category</span>
					</label>
					<input
						type="text"
						id="category"
						name="category"
						className="input-bordered w-full input"
					/>
				</div>

				<div className="form-control mb-4">
					<label className="label" htmlFor="timeInterval">
						<span className="label-text">Time Interval</span>
					</label>
					<select
						id="timeInterval"
						name="timeInterval"
						className="w-full select-bordered select"
						required
					>
						<option value="day">Day</option>
						<option value="week">Week</option>
						<option value="month">Month</option>
					</select>
					<small className="mt-4 text-gray-600">
						Note: If you choose "week" or "month" and want to start from now,
						add a week or month to the start date.
					</small>
				</div>

				<div className="gap-4 grid grid-cols-2 mb-4">
					<div className="form-control">
						<label className="label" htmlFor="startDate">
							<span className="label-text">Start Date</span>
						</label>
						<input
							type="date"
							id="startDate"
							name="startDate"
							className="input-bordered w-full input"
							required
						/>
					</div>
					<div className="form-control">
						<label className="label" htmlFor="endDate">
							<span className="label-text">End Date</span>
						</label>
						<input
							type="date"
							id="endDate"
							name="endDate"
							className="input-bordered w-full input"
							required
						/>
					</div>
				</div>

				<div className="form-control mb-4">
					<label className="label" htmlFor="boxColors">
						<span className="label-text">Box Colors</span>
					</label>
					<div className="flex flex-row flex-wrap gap-4">
						{colors.map((color, index) => (
							<div key={index + color} className="flex flex-col items-center">
								<ColorPicker
									initialColor={color}
									onChange={(newColor) => {
										const newColors = [...colors];
										newColors[index] = newColor;
										setColors(newColors);
									}}
								/>
								<label
									htmlFor={`boxColor${index}`}
									className="font-medium text-center text-sm"
								>
									{index === 0
										? "Failure"
										: index === colors.length - 1
											? "Success"
											: `Partial ${index}`}
								</label>
							</div>
						))}
					</div>
					<div className="flex justify-between mt-4">
						<button
							type="button"
							className="btn btn-outline btn-sm"
							onClick={addColor}
						>
							Add Color
						</button>
						{colors.length > 2 && (
							<button
								type="button"
								className="btn btn-error btn-outline btn-sm"
								onClick={removeColor}
							>
								Remove Color
							</button>
						)}
					</div>
					<small className="mt-4 text-gray-600">
						Note: Add more colors for partial success/failure states.
					</small>
				</div>

				<div className="flex justify-between">
					<button
						type="submit"
						className={`btn btn-primary ${loading ? "loading" : ""}`}
						disabled={loading}
					>
						{loading ? "Creating..." : "Create tracker"}
					</button>
					<button
						type="button"
						className="btn btn-ghost"
						onClick={() => navigate({ to: "/settings/achievements" })}
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};
