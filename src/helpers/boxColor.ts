import type { Doc } from "../../convex/_generated/dataModel";

export const boxColor = (box: Doc<"boxes">) => {
	let color = "";
	if (
		box.date === new Date().toISOString().split("T")[0] &&
		box.color === "#242327"
	) {
		color = "#f170ffea";
	} else if (
		box.date < new Date().toISOString().split("T")[0] &&
		box.color === "#242327"
	) {
		color = "#f6ad55";
	} else color = box.color || "transparent";

	return color;
};
