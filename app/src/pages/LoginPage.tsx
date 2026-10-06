import { useAuth } from '../auth/AuthProvider'

export function LoginPage() {
  const { isAuthenticated, login } = useAuth()

  if (isAuthenticated) {
    window.location.href = '/dashboard'
    return null
  }

  return (
    <div className="w-full h-full bg-yellow-200 flex items-center justify-center">
        <h1 className="mb-6 text-2xl font-bold">
          Login
        </h1>

        <button
          type="button"
          onClick={login}
          className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Login with Keycloak
        </button>
    </div>
  )
}
