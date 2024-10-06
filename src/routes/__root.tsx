import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "../index.css";

interface AuthContext {
	auth:
		| {
				isLoading: boolean;
				isAuthenticated: boolean;
		  }
		| undefined;
}

export const Route = createRootRouteWithContext<AuthContext>()({
	component: RootComponent,
});

function RootComponent() {
	return (
		<div className="bg-[#121212] w-full h-screen text-[#d6d6d6]">
			<div className="h-full overflow-y-auto">
				<Outlet />
			</div>
			<TanStackRouterDevtools position="bottom-right" />
		</div>
	);
}
