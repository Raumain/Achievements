import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "../index.css";
import Navbar from "../components/Navbar";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<div className="bg-[#121212] w-full h-screen text-[#d6d6d6]">
			<Navbar />
			<div>
				<Outlet />
			</div>
			<TanStackRouterDevtools position="bottom-right" />
		</div>
	);
}
