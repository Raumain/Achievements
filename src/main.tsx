import "./index.css";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ConvexReactClient, useConvexAuth } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { routeTree } from "./routeTree.gen";

// @ts-ignore
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	context: {
		auth: undefined,
	},
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

function InnerApp() {
	const auth = useConvexAuth();
	return <RouterProvider router={router} context={{ auth }} />;
}

// biome-ignore lint: ça me casse les couilles entre typescript et biome qui gueulent frère c'est bon je peux dev tranquille ?
const rootElement = document.getElementById("app")!;
if (!rootElement?.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);

	root.render(
		<ConvexAuthProvider client={convex}>
			<InnerApp />
		</ConvexAuthProvider>,
	);
}
