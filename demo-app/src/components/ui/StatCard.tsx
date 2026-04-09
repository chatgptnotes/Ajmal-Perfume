import { useAnimatedCounter } from '../../hooks/useAnimatedCounter'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  label: string
  value: number
  formatter: (n: number) => string
  trend?: number // percentage, positive = up
  icon?: React.ReactNode
}

export default function StatCard({ label, value, formatter, trend, icon }: StatCardProps) {
  const animatedValue = useAnimatedCounter(value)

  return (
    <div style={{
      background: 'var(--beige-section)',
      borderRadius: 12,
      padding: '24px 28px',
      boxShadow: 'var(--shadow-soft)',
      transition: 'all 0.3s var(--ease-luxury)',
      cursor: 'default',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--text-secondary)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase' as const,
            marginBottom: 8,
          }}>
            {label}
          </div>
          <div style={{
            fontSize: 32,
            fontWeight: 800,
            color: 'var(--gold-dark)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}>
            {formatter(animatedValue)}
          </div>
        </div>
        {icon && (
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: 'rgba(188, 139, 87, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--gold-primary)',
          }}>
            {icon}
          </div>
        )}
      </div>

      {trend !== undefined && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          marginTop: 12,
          fontSize: 13,
          fontWeight: 600,
          color: trend >= 0 ? 'var(--success)' : 'var(--error)',
        }}>
          {trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>{trend >= 0 ? '+' : ''}{trend}%</span>
          <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: 4 }}>vs last week</span>
        </div>
      )}
    </div>
  )
}
