import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
	beforeLoad: async ({ context, location }) => {
		if (!context.auth?.isAuthenticated) {
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
			<div className="bg-slate-600 p-4 w-full h-full">
				<Outlet />
			</div>
		</div>
	),
});
