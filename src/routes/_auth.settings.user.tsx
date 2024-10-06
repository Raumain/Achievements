import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { GitHubIcon } from "../assets/icons";

export const Route = createFileRoute("/_auth/settings/user")({
	component: () => <UserSettings />,
});

const UserSettings = () => {
	const user = useQuery(api.handlers.users.get);
	const updateUser = useMutation(api.handlers.users.update);
	console.log(user);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		await updateUser({ name, email });
	};

	return (
		<div className="p-8">
			<h1 className="mb-6 font-bold text-3xl">User settings</h1>
			{user ? (
				<div className="bg-base-200 shadow-xl card">
					<form onSubmit={handleSubmit} className="card-body">
						<div className="flex items-center mb-6">
							<img
								src={user.image}
								alt={user.name}
								className="mr-6 rounded-full w-24 h-24"
							/>
							<div>
								<h2 className="text-2xl card-title">{user.name}</h2>
								<p className="text-gray-400">{user.email}</p>
								{user.provider && (
									<p className="gap-1 mt-2 px-2 py-3 badge badge-outline badge-primary">
										<GitHubIcon size={"17"} />
										<span>Signed in with</span>
										<span className="capitalize">{user.provider}</span>
									</p>
								)}
							</div>
						</div>
						<div className="form-control w-full max-w-xs">
							<label htmlFor="name" className="label label-text">
								Name
							</label>
							<input
								type="text"
								name="name"
								id="name"
								placeholder="Votre nom"
								className="input-bordered w-full max-w-xs input"
								defaultValue={user.name}
							/>
						</div>
						<div className="form-control mt-4 w-full max-w-xs">
							<label htmlFor="email" className="label label-text">
								Email
							</label>
							<input
								type="email"
								name="email"
								id="email"
								placeholder="Votre email"
								className="input-bordered w-full max-w-xs input"
								defaultValue={user.email}
							/>
						</div>
						<div className="justify-end mt-6 card-actions">
							<button type="submit" className="btn btn-primary">
								Save changes
							</button>
						</div>
					</form>
				</div>
			) : (
				<p>Loading user settings...</p>
			)}
		</div>
	);
};
