import { Link } from 'react-router-dom'

import { useAuth } from '../auth/AuthProvider'

export function HomePage() {
  const { isAuthenticated, user, login, logout } = useAuth()

  return (
    <div className="min-h-screen p-8">
      <h1 className="mb-6 text-3xl font-bold">
        My Application
      </h1>

      {isAuthenticated ? (
        <div className="space-y-4">
          <p>
            Welcome, {user?.username}
          </p>

          <div className="flex gap-4">
            <Link
              to="/dashboard"
              className="rounded bg-blue-600 px-4 py-2 text-white"
            >
              Dashboard
            </Link>

            <button
              type="button"
              onClick={logout}
              className="rounded bg-gray-600 px-4 py-2 text-white"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={login}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Login
        </button>
      )}
    </div>
  )
}
