import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Menu } from "../components/Menu";

export const Route = createFileRoute("/_auth")({
	beforeLoad: async ({ context, location }) => {
		if (!context.auth?.isLoading && !context.auth?.isAuthenticated) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			});
		}
	},
	component: () => (
		<div className="flex h-full">
			<div className="p-4 w-full h-full">
				<div className="mb-4 w-full h-12">
					<Menu />
				</div>
				<Outlet />
			</div>
		</div>
	),
});
