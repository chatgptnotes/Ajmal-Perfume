import { createContext, useContext, useState, type ReactNode } from 'react'

export type Role = 'ceo' | 'area_manager' | 'store_manager'

interface RoleContextType {
  role: Role
  setRole: (role: Role) => void
  roleLabel: string
}

const RoleContext = createContext<RoleContextType | null>(null)

const ROLE_LABELS: Record<Role, string> = {
  ceo: 'CEO View',
  area_manager: 'Area Manager',
  store_manager: 'Store Manager',
}

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('ceo')
  return (
    <RoleContext.Provider value={{ role, setRole, roleLabel: ROLE_LABELS[role] }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  const ctx = useContext(RoleContext)
  if (!ctx) throw new Error('useRole must be used within RoleProvider')
  return ctx
}
