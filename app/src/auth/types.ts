export interface User {
  id: string
  username?: string
  email?: string
  firstName?: string
  lastName?: string
}

export interface AuthContextValue {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  token: string | undefined

  login: () => Promise<void>
  logout: () => Promise<void>

  getToken: () => Promise<string>
  hasRole: (role: string) => boolean
}
