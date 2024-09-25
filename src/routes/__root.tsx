import {
	Link,
	Outlet,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "../index.css";
import Navbar from "../components/Navbar";

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
			{/* <Navbar /> */}
			<div className="h-full">
				<Outlet />
			</div>
			<TanStackRouterDevtools position="bottom-right" />
		</div>
	);
}
