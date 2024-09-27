import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/settings/dashboard")({
  component: () => <Dashboard />,
});

const Dashboard = () => {
  return (
    <div className="container">
      <h1 className="mb-4 font-bold text-2xl">Dashboard Settings</h1>
    </div>
  );
};
