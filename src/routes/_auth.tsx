import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

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
				<Outlet />
			</div>
		</div>
	),
});
