import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { LogoutIcon, GitHubIcon } from "../assets/icons/";

export function AuthButton({ isLogged }: { isLogged: boolean }) {
	const { signIn, signOut } = useAuthActions();
	const [isBusy, setIsBusy] = useState(false);

	return (
		<button
			type="button"
			className="top-2 right-4 fixed btn"
			disabled={isBusy}
			onClick={() => {
				setIsBusy(true);
				isLogged
					? void signOut().then(() => setIsBusy(false))
					: void signIn("github").then(() => setIsBusy(false));
			}}
		>
			{isBusy ? (
				<span className="loading loading-spinner" />
			) : isLogged ? (
				<LogoutIcon />
			) : (
				<GitHubIcon />
			)}
			{isLogged ? "Sign Out" : "Sign In with GitHub"}
		</button>
	);
}
