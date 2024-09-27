import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Menu } from "../components/Menu";

export const Route = createFileRoute("/_auth/settings")({
	component: () => <Settings />,
});

const Settings = () => {
	return (
		<div className="w-full h-full overflow-auto">
			<div className="mb-4 w-full h-12">
				<Menu />
			</div>
			<Outlet />
		</div>
	);
};
