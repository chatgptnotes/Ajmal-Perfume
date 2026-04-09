import { useEffect, useState } from 'react'
import { formatCurrencyFull } from '../../utils/formatCurrency'
import { formatTimeAgo } from '../../utils/formatDate'

interface Transaction {
  store: string
  city: string
  product: string
  amount: number
  minutesAgo: number
}

export default function SalesTicker({ transactions }: { transactions: Transaction[] }) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % transactions.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [transactions.length])

  const visible = transactions.slice(offset, offset + 3).concat(
    transactions.slice(0, Math.max(0, offset + 3 - transactions.length))
  )

  return (
    <div style={{
      background: 'var(--beige-section)',
      borderRadius: 10,
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      overflow: 'hidden',
    }}>
      <span style={{
        fontSize: 10,
        fontWeight: 700,
        color: 'var(--gold-primary)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase' as const,
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}>
        LIVE
      </span>
      <div style={{
        width: 6, height: 6, borderRadius: '50%',
        background: 'var(--success)',
        animation: 'pulse 2s infinite',
        flexShrink: 0,
      }} />
      <div style={{
        display: 'flex',
        gap: 32,
        overflow: 'hidden',
        flex: 1,
      }}>
        {visible.map((tx, i) => (
          <span key={`${tx.store}-${i}`} style={{
            fontSize: 13,
            color: 'var(--text-secondary)',
            whiteSpace: 'nowrap',
            transition: 'opacity 0.5s ease',
          }}>
            <strong style={{ color: 'var(--text-primary)' }}>{tx.store}</strong>
            {' — '}
            {tx.product}
            {' — '}
            <span style={{ color: 'var(--gold-dark)', fontWeight: 600 }}>{formatCurrencyFull(tx.amount)}</span>
            {' — '}
            <span style={{ color: 'var(--text-muted)' }}>{formatTimeAgo(tx.minutesAgo)}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
