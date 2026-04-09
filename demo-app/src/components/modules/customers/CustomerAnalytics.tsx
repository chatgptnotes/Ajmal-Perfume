import { useState } from 'react'
import { Search, ChevronRight, ShoppingBag, Globe, AlertCircle } from 'lucide-react'
import { customers } from '../../../config'
import { formatCurrencyFull } from '../../../utils/formatCurrency'

const RISK_COLORS = { low: 'var(--success)', medium: 'var(--warning)', high: 'var(--error)' }
const SEGMENT_COLORS: Record<string, string> = {
  'High-Value Loyalist': '#BC8B57',
  'Premium Collector': '#754C28',
  'Regular Buyer': '#7E6040',
  'Lapsed': '#BE4040',
  'First-Time Buyer': '#00940F',
}

export default function CustomerAnalytics() {
  const [selectedId, setSelectedId] = useState(customers[0].id)
  const customer = customers.find(c => c.id === selectedId) || customers[0]

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--gold-dark)', marginBottom: 4 }}>
        Customer Intelligence
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
        Know Your Customer. Reach Them. Keep Them.
      </p>

      {/* Search + Customer List */}
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ width: 280, flexShrink: 0 }}>
          <div style={{
            background: 'white', borderRadius: 10, padding: '10px 16px', marginBottom: 12,
            display: 'flex', alignItems: 'center', gap: 8, border: '1px solid var(--sand)',
          }}>
            <Search size={16} style={{ color: 'var(--text-muted)' }} />
            <input placeholder="Search customers..." style={{
              border: 'none', outline: 'none', fontSize: 13, flex: 1, background: 'transparent',
            }} />
          </div>
          {customers.map(c => (
            <div key={c.id} onClick={() => setSelectedId(c.id)} style={{
              padding: '12px 16px', borderRadius: 10, marginBottom: 4, cursor: 'pointer',
              background: c.id === selectedId ? 'rgba(188,139,87,0.1)' : 'transparent',
              border: c.id === selectedId ? '1px solid var(--gold-primary)' : '1px solid transparent',
              transition: 'all 0.2s ease',
            }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
                <span style={{
                  fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 10,
                  background: `${SEGMENT_COLORS[c.segment] || '#BC8B57'}15`,
                  color: SEGMENT_COLORS[c.segment] || '#BC8B57',
                }}>{c.segment}</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>LTV {formatCurrencyFull(c.ltv)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Customer Profile */}
        <div style={{ flex: 1 }}>
          {/* Header Card */}
          <div style={{
            background: 'white', borderRadius: 12, padding: 24, marginBottom: 16,
            boxShadow: 'var(--shadow-card)', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'linear-gradient(135deg, #BC8B57, #E5AD23)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 800, fontSize: 20,
              }}>
                {customer.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--gold-dark)' }}>{customer.name}</h2>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 4 }}>
                  <span style={{
                    fontSize: 12, fontWeight: 600, padding: '3px 12px', borderRadius: 20,
                    background: `${SEGMENT_COLORS[customer.segment] || '#BC8B57'}15`,
                    color: SEGMENT_COLORS[customer.segment] || '#BC8B57',
                  }}>{customer.segment}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Member since {customer.memberSince.slice(0, 4)}</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 24 }}>
              <div style={{ textAlign: 'center' as const }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--gold-dark)' }}>{formatCurrencyFull(customer.ltv)}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Lifetime Value</div>
              </div>
              <div style={{ textAlign: 'center' as const }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: RISK_COLORS[customer.churnRisk] }}>
                  {customer.churnRisk === 'low' ? 'Low Risk' : customer.churnRisk === 'medium' ? 'Medium' : 'High Risk'}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Churn Risk</div>
              </div>
            </div>
          </div>

          {/* 3-column layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {/* Purchase History */}
            <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: 'var(--shadow-soft)' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--gold-dark)', marginBottom: 16 }}>Purchase History</h3>
              {customer.purchases.map((p, i) => (
                <div key={i} style={{ padding: '10px 0', borderBottom: i < customer.purchases.length - 1 ? '1px solid var(--beige-section)' : 'none' }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    {p.channel === 'Retail' ? <ShoppingBag size={12} style={{ color: 'var(--gold-primary)' }} /> : <Globe size={12} style={{ color: 'var(--text-muted)' }} />}
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.date} — {p.channel}</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginTop: 4 }}>{p.product}</div>
                  <div style={{ fontSize: 13, color: 'var(--gold-primary)', fontWeight: 600 }}>{formatCurrencyFull(p.amount)}</div>
                </div>
              ))}
            </div>

            {/* Preferences */}
            <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: 'var(--shadow-soft)' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--gold-dark)', marginBottom: 16 }}>Preferences & Patterns</h3>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Preferred Notes</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {customer.preferredNotes.map(n => (
                    <span key={n} style={{
                      fontSize: 12, padding: '4px 10px', borderRadius: 20,
                      background: 'rgba(188,139,87,0.1)', color: 'var(--gold-dark)', fontWeight: 500,
                    }}>{n}</span>
                  ))}
                </div>
              </div>
              {customer.avgPurchaseCycle && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Purchase Cycle</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--gold-dark)' }}>{customer.avgPurchaseCycle} days</div>
                </div>
              )}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Next Purchase</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: customer.nextPurchasePredicted === 'overdue' ? 'var(--error)' : 'var(--gold-dark)' }}>
                  {customer.nextPurchasePredicted === 'overdue' ? 'Overdue!' : customer.nextPurchasePredicted}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Channel Split</div>
                {Object.entries(customer.channelSplit).filter(([_, v]) => v > 0).map(([ch, pct]) => (
                  <div key={ch} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 60, fontSize: 12, color: 'var(--text-secondary)', textTransform: 'capitalize' as const }}>{ch}</div>
                    <div style={{ flex: 1, height: 6, background: 'var(--beige-section)', borderRadius: 3 }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, #BC8B57, #E5AD23)', borderRadius: 3 }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--gold-dark)', width: 30 }}>{pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: 'var(--shadow-soft)' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--gold-dark)', marginBottom: 16 }}>Recommended Actions</h3>
              {customer.actions.map((action, i) => (
                <div key={i} style={{
                  background: 'var(--beige-section)', borderRadius: 10, padding: '14px 16px',
                  marginBottom: 10, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  transition: 'all 0.2s ease',
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <AlertCircle size={16} style={{ color: 'var(--gold-primary)', marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{action}</span>
                  </div>
                  <ChevronRight size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
