import React, { createContext, useContext, useEffect, useState } from 'react'
import App from '../app/App'

interface HealthCheckContextProps {
  healthCheck?: App.HealthCheck.RootObject
}

export const HealthCheckContext = createContext({} as HealthCheckContextProps)

export const HealthCheckProvider: React.FC = ({ children }) => {
  const [healthCheck, setHealthCheck] = useState<App.HealthCheck.RootObject>()

  useEffect(() => {
    App.HealthCheck.get().then(() => {
      setHealthCheck(App.HealthCheck.data)
    })
  }, [])

  return (
    <HealthCheckContext.Provider
      value={{
        healthCheck,
      }}
    >
      {children}
    </HealthCheckContext.Provider>
  )
}

export function useHealth() {
  return useContext(HealthCheckContext)
}
