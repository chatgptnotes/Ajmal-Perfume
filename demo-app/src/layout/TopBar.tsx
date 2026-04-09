import { Bell, ChevronDown } from 'lucide-react'
import { useRole, type Role } from './RoleContext'

export default function TopBar() {
  const { role, setRole } = useRole()
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <header style={{
      height: 64, background: 'white', borderBottom: '1px solid var(--sand)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--gold-dark)' }}>Ajmal Perfumes</span>
        <span style={{
          fontSize: 11, color: 'white', padding: '3px 10px',
          borderRadius: 20, background: 'linear-gradient(135deg, #BC8B57, #D4A76A)', fontWeight: 600,
          letterSpacing: '0.06em',
        }}>SILK</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{today}</span>
        <div style={{ position: 'relative' }}>
          <select value={role} onChange={(e) => setRole(e.target.value as Role)} style={{
            appearance: 'none', background: 'var(--beige-section)',
            border: '1px solid var(--sand)', borderRadius: 50,
            padding: '8px 36px 8px 16px', fontSize: 13, fontWeight: 600,
            color: 'var(--gold-dark)', cursor: 'pointer', outline: 'none',
          }}>
            <option value="ceo">CEO View</option>
            <option value="area_manager">Area Manager</option>
            <option value="store_manager">Store Manager</option>
          </select>
          <ChevronDown size={14} style={{
            position: 'absolute', right: 12, top: '50%',
            transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--gold-dark)',
          }} />
        </div>
        <button style={{
          position: 'relative', background: 'none', border: 'none',
          cursor: 'pointer', color: 'var(--text-secondary)', padding: 4,
        }}>
          <Bell size={20} />
          <span style={{
            position: 'absolute', top: 0, right: 0, width: 8, height: 8,
            borderRadius: '50%', background: 'var(--error)',
          }} />
        </button>
      </div>
    </header>
  )
}
