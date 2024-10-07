import type { Doc } from "../../convex/_generated/dataModel";

export const boxColor = (box: Doc<"boxes">) => {
	let color = "";
	let content = "";
	if (
		box.date === new Date().toISOString().split("T")[0] &&
		box.color === "#242327"
	) {
		color = "#f170ffea";
		content = "?";
	} else if (
		box.date < new Date().toISOString().split("T")[0] &&
		box.color === "#242327"
	) {
		color = "#f6ad55";
		content = "!";
	} else color = box.color || "transparent";

	return { color, content };
};
