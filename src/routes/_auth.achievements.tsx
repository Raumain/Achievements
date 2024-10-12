import { Link, createFileRoute } from "@tanstack/react-router";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Doc } from "../../convex/_generated/dataModel";
import { PinnedFullIcon, PinnedIcon } from "../assets/icons";
import { AuthButton } from "../components/AuthButton";
import { Menu } from "../components/Menu";
import { boxColor } from "../helpers/boxColor";
import { convex } from "../main";

export const Route = createFileRoute("/_auth/achievements")({
	component: () => <Achievements />,
	pendingComponent: () => <div>Loading...</div>,
});

const Achievements = () => {
	const { isAuthenticated } = useConvexAuth();
	const user = useQuery(api.handlers.users.get);
	const achievements = useQuery(api.handlers.achievements.getAll, {
		userId: user?._id || "",
	});

	const pinnedAchievements = achievements?.filter((a) => a.isPinned) || [];
	const unpinnedAchievements = achievements?.filter((a) => !a.isPinned) || [];

	if (!achievements) {
		return <div>Loading...</div>;
	}

	return (
		<div className="p-2 h-full">
			<div className="flex justify-between items-center mb-4">
				<Menu />
				<AuthButton isLogged={isAuthenticated} />
			</div>
			<div className="mx-auto px-4 container">
				<h1 className="mb-6 font-bold text-3xl">Achievements</h1>

				{pinnedAchievements?.length > 0 && (
					<div className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl">Pinned</h2>
						<div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
							{pinnedAchievements?.map((achievement) => (
								<AchievementCard
									key={achievement?._id}
									achievement={achievement}
									isPinned={true}
								/>
							))}
						</div>
					</div>
				)}

				<div>
					<h2 className="mb-4 font-semibold text-2xl">All Achievements</h2>
					<div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-2">
						{unpinnedAchievements?.map((achievement) => (
							<AchievementCard
								key={achievement._id}
								achievement={achievement}
								isPinned={false}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

const AchievementCard = ({
	achievement,
	isPinned,
}: { achievement: Doc<"achievements">; isPinned: boolean }) => {
	const {
		_creationTime,
		_id,
		createdBy,
		totalBoxes,
		updatedAt,
		...updateableAchievement
	} = achievement;
	return (
		<div className="bg-base-100 h-60 transition-all duration-300 card hover:scale-105">
			<div className="card-body">
				<div className="flex justify-between items-start">
					<h3 className="card-title">{achievement.name}</h3>
					<button
						type="button"
						className="btn btn-circle btn-ghost"
						onClick={() => {
							convex.mutation(api.handlers.achievements.update, {
								id: achievement._id,
								achievement: {
									...updateableAchievement,
									isPinned: !isPinned,
								},
							});
						}}
					>
						{isPinned ? <PinnedFullIcon /> : <PinnedIcon />}
					</button>
				</div>
				<Link
					to={`/achievements/${achievement._id}`}
					className="flex flex-col justify-between h-full"
				>
					<p>{achievement.description}</p>
					<TrackerPreview achievement={achievement} />
					<div className="justify-between items-center mt-4 card-actions">
						<span className="badge badge-primary">{achievement.category}</span>
						<span className="text-gray-500 text-sm">
							{new Date(achievement._creationTime).toLocaleDateString()}
						</span>
					</div>
				</Link>
			</div>
		</div>
	);
};

const TrackerPreview = ({
	achievement,
}: { achievement: Doc<"achievements"> }) => {
	const boxes = useQuery(api.handlers.boxes.getFive, {
		achievementId: achievement._id,
	});

	return (
		<div className="flex flex-wrap gap-2">
			{boxes?.map((box, i) => (
				<div key={box._id} className="tooltip" data-tip={box.date}>
					<div
						style={{
							borderWidth: "1px",
							borderColor: boxColor(box).color,
							backgroundColor: box.color,
						}}
						className="flex flex-col justify-center items-center border-slate-500 border rounded w-5 h-5"
					>
						<small>{boxColor(box).content}</small>
					</div>
				</div>
			))}
		</div>
	);
};
