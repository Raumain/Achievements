import GitHub from "@auth/core/providers/github";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store } = convexAuth({
	providers: [
		GitHub({
			profile(githubProfile, tokens) {
				return {
					id: githubProfile.id.toString(),
					name: githubProfile.name,
					email: githubProfile.email,
					image: githubProfile.avatar_url,
					provider: "github",
				};
			},
		}),
	],
});
