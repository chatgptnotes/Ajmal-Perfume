import { Outlet } from 'react-router-dom'
import { RoleProvider } from './RoleContext'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

export default function AppShell() {
  return (
    <RoleProvider>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <TopBar />
          <main style={{ flex: 1, padding: 32, overflowY: 'auto', background: 'var(--cream-bg)' }}>
            <Outlet />
          </main>
        </div>
      </div>
    </RoleProvider>
  )
}
