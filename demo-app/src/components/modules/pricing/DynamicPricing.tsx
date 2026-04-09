import { AlertTriangle, Check, ArrowRight } from 'lucide-react'
import { formatCurrencyFull } from '../../../utils/formatCurrency'

const PRICING_RECS = [
  {
    sku: 'Eid Gift Set Premium',
    current: 7500,
    recommended: 6375,
    action: 'Markdown 15%',
    reason: 'Last year 20% off moved 3x volume. AI suggests 15% to optimize margin.',
    impact: '+180% volume, +53% net revenue',
    confidence: 94,
    type: 'markdown',
  },
  {
    sku: 'Dahn Al Oudh 50ml',
    current: 6500,
    recommended: 6500,
    action: 'Hold Price',
    reason: 'Demand exceeding supply at 6 stores. No discount needed — focus on restocking.',
    impact: 'Maintain margin, prevent stockout erosion',
    confidence: 97,
    type: 'hold',
  },
  {
    sku: 'Silver Shade 100ml',
    current: 1200,
    recommended: 1080,
    action: 'Markdown 10%',
    reason: 'Overstock at 8 stores. Gentle markdown moves volume without brand damage.',
    impact: '+45% volume, break-even on margin',
    confidence: 82,
    type: 'markdown',
  },
  {
    sku: 'Amber Wood 75ml',
    current: 3200,
    recommended: 3200,
    action: 'Bundle Opportunity',
    reason: 'Cross-sell with Bakhoor Al Mas. Bundle at ₹3,650 (save ₹350) increases basket.',
    impact: '+22% basket size when bundled',
    confidence: 88,
    type: 'bundle',
  },
]

const CHANNEL_PRICES = [
  { channel: 'Retail Store', price: 6500, aligned: true },
  { channel: 'in.ajmal.com', price: 6500, aligned: true },
  { channel: 'Nykaa', price: 6240, aligned: false },
  { channel: 'Amazon', price: 6175, aligned: false },
  { channel: 'Shoppers Stop', price: 6500, aligned: true },
]

export default function DynamicPricing() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--gold-dark)', marginBottom: 4 }}>
        Dynamic Pricing
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
        The Right Price. The Right Store. The Right Time.
      </p>

      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: 'var(--shadow-soft)', textAlign: 'center' as const }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--gold-dark)' }}>3-8%</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Margin Improvement</div>
        </div>
        <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: 'var(--shadow-soft)', textAlign: 'center' as const }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--success)' }}>Zero</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Channel Price Conflicts</div>
        </div>
        <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: 'var(--shadow-soft)', textAlign: 'center' as const }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--gold-primary)' }}>4</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Active Recommendations</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Pricing Recommendations */}
        <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: 'var(--shadow-card)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--gold-dark)', marginBottom: 16 }}>AI Pricing Recommendations</h2>
          {PRICING_RECS.map((rec, i) => (
            <div key={i} style={{
              background: 'var(--beige-section)', borderRadius: 10, padding: 18, marginBottom: 10,
              borderLeft: `3px solid ${rec.type === 'markdown' ? 'var(--warning)' : rec.type === 'hold' ? 'var(--success)' : 'var(--gold-primary)'}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{rec.sku}</span>
                <span style={{
                  fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20,
                  background: rec.type === 'markdown' ? 'rgba(229,173,35,0.15)' : rec.type === 'hold' ? 'rgba(0,148,15,0.1)' : 'rgba(188,139,87,0.15)',
                  color: rec.type === 'markdown' ? 'var(--warning)' : rec.type === 'hold' ? 'var(--success)' : 'var(--gold-primary)',
                }}>{rec.action}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 14, color: 'var(--text-muted)', textDecoration: rec.current !== rec.recommended ? 'line-through' : 'none' }}>
                  {formatCurrencyFull(rec.current)}
                </span>
                {rec.current !== rec.recommended && (
                  <>
                    <ArrowRight size={14} style={{ color: 'var(--gold-primary)' }} />
                    <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--gold-dark)' }}>{formatCurrencyFull(rec.recommended)}</span>
                  </>
                )}
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 6 }}>{rec.reason}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: 'var(--success)', fontWeight: 600 }}>{rec.impact}</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{rec.confidence}% confidence</span>
              </div>
            </div>
          ))}
        </div>

        {/* Channel Price Governance */}
        <div>
          <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: 'var(--shadow-card)', marginBottom: 16 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--gold-dark)', marginBottom: 16 }}>
              Channel Price Governance — Dahn Al Oudh 50ml
            </h2>
            {CHANNEL_PRICES.map((ch, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 0', borderBottom: i < CHANNEL_PRICES.length - 1 ? '1px solid var(--beige-section)' : 'none',
              }}>
                <span style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>{ch.channel}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: ch.aligned ? 'var(--gold-dark)' : 'var(--error)' }}>
                    {formatCurrencyFull(ch.price)}
                  </span>
                  {ch.aligned ? (
                    <Check size={16} style={{ color: 'var(--success)' }} />
                  ) : (
                    <AlertTriangle size={16} style={{ color: 'var(--error)' }} />
                  )}
                </div>
              </div>
            ))}
            <div style={{
              marginTop: 12, padding: '10px 14px', background: 'rgba(190,64,64,0.06)',
              borderRadius: 8, fontSize: 12, color: 'var(--error)', fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <AlertTriangle size={14} />
              Nykaa and Amazon prices below retail floor. Alert sent to marketplace team.
            </div>
          </div>

          <div style={{
            background: 'var(--beige-section)', borderRadius: 12, padding: 20,
            fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6,
          }}>
            <strong style={{ color: 'var(--gold-dark)' }}>How it works:</strong> Most retailers over-discount because they lack price elasticity data. The AI finds the discount that moves inventory without destroying margin. Markdown optimization alone typically pays for the platform.
          </div>
        </div>
      </div>
    </div>
  )
}
