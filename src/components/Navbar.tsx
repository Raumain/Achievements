import { Link } from "@tanstack/react-router";

export default function Navbar() {
	return (
		<nav className="p-4">
			{/* biome-ignore lint/a11y/useSemanticElements: <explanation> */}
			<div role="tablist" className="tabs tabs-boxed">
				<Link
					to="/"
					role="tab"
					className="tab"
					activeProps={{
						className: "font-bold tab-active !text-slate-200",
					}}
					activeOptions={{ exact: true }}
				>
					Home
				</Link>
				<Link
					to="/test"
					role="tab"
					className="tab"
					activeProps={{
						className: "font-bold tab-active !text-slate-200",
					}}
				>
					Details
				</Link>
			</div>
		</nav>
	);
}
