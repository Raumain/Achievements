import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Menu } from "../components/Menu";

export const Route = createFileRoute("/_auth/settings")({
	component: () => <Settings />,
});

const Settings = () => {
	return (
		<div className="w-full">
			<Outlet />
		</div>
	);
};
