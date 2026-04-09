import { Construction } from 'lucide-react'

export default function Placeholder({ title }: { title: string }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', height: '60vh', gap: 16,
    }}>
      <Construction size={48} style={{ color: 'var(--gold-primary)' }} />
      <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--gold-dark)', letterSpacing: '-0.02em' }}>
        {title}
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Module coming soon</p>
    </div>
  )
}
