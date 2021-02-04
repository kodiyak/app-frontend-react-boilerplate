import React, { createContext, useContext } from 'react'
import App from '../app/App'

interface RoleContextProps {
  roles: App.Role[]
  permissions: App.Permission[]
  revalidate: () => any
}

export const RoleContext = createContext({} as RoleContextProps)

export const RoleProvider: React.FC = ({ children }) => {
  const rolesData = App.Role.swr({
    fields: ['*'],
    includes: {
      permissions: {
        fields: ['*'],
      },
    },
  })
  const permissionsData = App.Permission.swr({
    fields: ['*'],
  })

  const revalidate = async () => {
    await permissionsData.revalidate()
    await rolesData.revalidate()
  }

  return (
    <RoleContext.Provider
      value={{
        roles: rolesData.data || [],
        permissions: permissionsData.data || [],
        revalidate,
      }}
    >
      {children}
    </RoleContext.Provider>
  )
}

export function useRoles() {
  return useContext(RoleContext)
}
