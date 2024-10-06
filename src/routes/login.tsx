import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { AuthButton } from "../components/AuthButton";

export const Route = createFileRoute("/login")({
	component: () => <Login />,
});

const Login = () => {
	const { isAuthenticated } = useConvexAuth();
	const user = useQuery(api.handlers.users.get);
	return (
		<div className="h-full">
			<div className="flex justify-center items-center bg-base-200 min-h-screen">
				<div className="bg-base-100 shadow-xl w-96 card">
					<div className="card-body">
						<h2 className="justify-center card-title">
							{user ? "Login" : "Register"}
						</h2>
						<form>
							<div className="form-control">
								<label htmlFor="email" className="label">
									Email
								</label>
								<input
									id="email"
									name="email"
									type="email"
									placeholder="email@example.com"
									className="input-bordered input"
									required
								/>
							</div>
							<div className="form-control">
								<label htmlFor="password" className="label">
									Password
								</label>
								<input
									type="password"
									placeholder="********"
									className="input-bordered input"
									required
								/>
							</div>
							<div className="form-control mt-6">
								<button type="submit" className="btn btn-primary">
									{user ? "Login" : "Register"}
								</button>
							</div>
						</form>
						<div className="divider">OR</div>
						<AuthButton isLogged={isAuthenticated} />
						<p className="mt-4 text-center">
							{user ? "Don't have an account? " : "Already have an account? "}
							<Link to="" className="link link-primary">
								{user ? "Register" : "Login"}
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
