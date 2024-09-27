import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/settings/user')({
  component: () => <Dashboard />,
})

const Dashboard = () => {
  return <div className="h-full">user</div>
}
