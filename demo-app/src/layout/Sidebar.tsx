import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, MonitorSmartphone, TrendingUp, Package,
  Users, UserCircle, Sparkles, GraduationCap, MessageCircle, DollarSign,
  ChevronLeft, ChevronRight
} from 'lucide-react'
import { useState } from 'react'

const NAV_GROUPS = [
  {
    label: 'FOUNDATION',
    items: [
      { path: '/', icon: LayoutDashboard, label: 'Command Center' },
      { path: '/pos', icon: MonitorSmartphone, label: 'Smart POS' },
    ],
  },
  {
    label: 'INTELLIGENCE',
    items: [
      { path: '/forecast', icon: TrendingUp, label: 'Demand Forecast' },
      { path: '/inventory', icon: Package, label: 'Inventory' },
      { path: '/staff', icon: Users, label: 'Staff Performance' },
      { path: '/customers', icon: UserCircle, label: 'Customers' },
    ],
  },
  {
    label: 'EXPERIENCE',
    items: [
      { path: '/fragrance-advisor', icon: Sparkles, label: 'Fragrance AI' },
      { path: '/academy', icon: GraduationCap, label: 'Academy' },
      { path: '/whatsapp', icon: MessageCircle, label: 'WhatsApp CRM' },
      { path: '/pricing', icon: DollarSign, label: 'Pricing' },
    ],
  },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  return (
    <aside style={{
      width: collapsed ? 68 : 240,
      minHeight: '100vh',
      background: 'var(--light-beige)',
      borderRight: '1px solid var(--sand)',
      transition: 'width 0.3s var(--ease-luxury)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      <div style={{
        padding: collapsed ? '12px 8px' : '12px 8px 12px 12px',
        borderBottom: '1px solid var(--sand)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 4,
      }}>
        {collapsed ? (
          <span style={{
            fontWeight: 900, fontSize: 22,
            color: 'var(--gold-dark)', letterSpacing: '0.12em',
            fontFamily: "'Philosopher', serif",
            width: '100%', textAlign: 'center' as const,
          }}>
            S
          </span>
        ) : (
          <img
            src="/silk-logo.png"
            alt="SILK — Scent Intelligence & Luxury Kinetics"
            style={{
              width: '100%',
              maxWidth: 190,
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
              mixBlendMode: 'multiply',
            }}
          />
        )}
        <button onClick={() => setCollapsed(!collapsed)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text-secondary)', padding: 4, flexShrink: 0,
        }}>
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav style={{ flex: 1, padding: '12px 0', overflowY: 'auto' }}>
        {NAV_GROUPS.map((group) => (
          <div key={group.label} style={{ marginBottom: 8 }}>
            {!collapsed && (
              <div style={{
                padding: '8px 24px 4px', fontSize: 10, fontWeight: 700,
                color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' as const,
              }}>
                {group.label}
              </div>
            )}
            {group.items.map((item) => {
              const isActive = location.pathname === item.path
              const Icon = item.icon
              return (
                <NavLink key={item.path} to={item.path} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: collapsed ? '10px 22px' : '10px 24px',
                  margin: '2px 8px', borderRadius: 10, textDecoration: 'none',
                  fontSize: 14, fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--gold-dark)' : 'var(--text-secondary)',
                  background: isActive ? 'rgba(188, 139, 87, 0.12)' : 'transparent',
                  transition: 'all 0.2s ease',
                }}>
                  <Icon size={18} style={{ flexShrink: 0 }} />
                  {!collapsed && <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>}
                </NavLink>
              )
            })}
          </div>
        ))}
      </nav>

      {!collapsed && (
        <div style={{
          padding: '16px 24px', borderTop: '1px solid var(--sand)',
          fontSize: 11, color: 'var(--text-muted)',
        }}>
          SILK by Bettroi
        </div>
      )}
    </aside>
  )
}
