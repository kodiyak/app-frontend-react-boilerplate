import React, { createContext, useContext, useEffect, useState } from 'react'
import App from '../app/App'

interface AuthContextProps {
  auth?: App.User
  isAuth: boolean
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider: React.FC = ({ children }) => {
  const [auth, setAuth] = useState<App.User>()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    App.Auth.authByLocalStorage().then(() => {
      setLoading(false)
    })
    App.Auth.events.on('login', ({ user }) => {
      setAuth(user)
    })
    App.Auth.events.on('logout', () => {
      setAuth(undefined)
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        auth,
        isAuth: !!auth,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
