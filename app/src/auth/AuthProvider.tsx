import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import keycloak from './keycloak'
import type { AuthContextValue, User } from './types'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    keycloak.authenticated ?? false,
  )

  const [user, setUser] = useState<User | null>(() => {
    if (!keycloak.authenticated || !keycloak.tokenParsed) {
      return null
    }

    const token = keycloak.tokenParsed

    return {
      id: token.sub ?? '',
      username: token.preferred_username,
      email: token.email,
      firstName: token.given_name,
      lastName: token.family_name,
    }
  })

  const login = useCallback(async () => {
    await keycloak.login()
  }, [])

  const logout = useCallback(async () => {
    await keycloak.logout({
      redirectUri: window.location.origin,
    })
  }, [])

  const getToken = useCallback(async (): Promise<string> => {
    try {
      // Refresh if the token expires within 30 seconds.
      await keycloak.updateToken(30)

      if (!keycloak.token) {
        throw new Error('No authentication token available')
      }

      return keycloak.token
    } catch (error) {
      console.error('Failed to refresh authentication token', error)

      keycloak.clearToken()

      setIsAuthenticated(false)
      setUser(null)

      throw error
    }
  }, [])

  const hasRole = useCallback((role: string): boolean => {
    return keycloak.hasRealmRole(role)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      isLoading: false,
      user,
      token: keycloak.token,

      login,
      logout,
      getToken,
      hasRole,
    }),
    [
      isAuthenticated,
      user,
      login,
      logout,
      getToken,
      hasRole,
    ],
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
