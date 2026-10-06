import { useAuth } from '../auth/AuthProvider'

export function DashboardPage() {
  const { user, logout, getToken } = useAuth()

  async function showToken() {
    const token = await getToken()

    console.log('Access token:', token)
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="mb-4 text-3xl font-bold">
        Dashboard
      </h1>

      <div className="mb-6 rounded-lg border p-6">
        <p>
          <strong>User ID:</strong> {user?.id}
        </p>

        <p>
          <strong>Username:</strong> {user?.username}
        </p>

        <p>
          <strong>Email:</strong> {user?.email}
        </p>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={showToken}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Get Token
        </button>

        <button
          type="button"
          onClick={logout}
          className="rounded bg-gray-600 px-4 py-2 text-white"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
