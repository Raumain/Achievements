import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Tab = ({
	link,
	icon,
	text,
	className,
}: {
	link: Parameters<typeof Link>[0]["to"];
	icon: ReactNode;
	text: string;
	className?: string;
}) => {
	return (
		<Link
			activeProps={{
				className: "text-primary",
			}}
			to={link}
			className={`hover:bg-base-100 hover:text-primary transition-all duration-300 ease-in-out tab flex items-center gap-1 ${className}`}
		>
			{icon}
			<span>{text}</span>
		</Link>
	);
};
