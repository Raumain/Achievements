import { Tab } from "./Tab";
import {
	DashboardIcon,
	HomeIcon,
	SettingsIcon,
	UserIcon,
} from "../assets/icons";
import { useLocation } from "@tanstack/react-router";
import { useConvexAuth } from "convex/react";
export const Menu = () => {
	const { isAuthenticated } = useConvexAuth();
	const pathname = useLocation().pathname;
	return (
		<div className="top-4 left-4 z-50 fixed">
			<div className="gap-1 bg-base-200 shadow-lg p-2 sho tabs tabs-boxed">
				<Tab link="/" icon={<HomeIcon />} text="Home" />
				{pathname.includes("/settings") ? (
					<>
						<Tab link="/settings/user" icon={<UserIcon />} text="User" />
						<Tab
							link="/settings/achievements"
							icon={<DashboardIcon />}
							text="Achievements"
						/>
					</>
				) : (
					isAuthenticated && (
						<Tab
							link="/settings/user"
							icon={<SettingsIcon />}
							text="Settings"
						/>
					)
				)}
			</div>
		</div>
	);
};
