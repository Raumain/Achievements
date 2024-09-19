import "./index.css";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { routeTree } from "./routeTree.gen";

// @ts-ignore
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

const router = createRouter({
	routeTree,
	defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

// biome-ignore lint: ça me casse les couilles entre typescript et biome qui gueulent frère c'est bon je peux dev tranquille ?
const rootElement = document.getElementById("app")!;
if (!rootElement?.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<ConvexProvider client={convex}>
			<RouterProvider router={router} />
		</ConvexProvider>
	);
}
