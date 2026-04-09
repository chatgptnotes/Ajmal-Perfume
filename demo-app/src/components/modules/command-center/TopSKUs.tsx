import { formatCurrencyShort, formatNumber } from '../../../utils/formatCurrency'

interface SKUEntry {
  name: string
  unitsSold: number
  revenue: number
}

interface TopSKUsProps {
  data: readonly SKUEntry[]
}

const RANK_COLORS = [
  { bg: '#BC8B57', text: '#fff' },
  { bg: '#C99A66', text: '#fff' },
  { bg: '#D4A76A', text: '#fff' },
  { bg: '#DFB87E', text: '#5A3E1F' },
  { bg: '#E8C892', text: '#5A3E1F' },
]

export default function TopSKUs({ data }: TopSKUsProps) {
  const maxRevenue = data.length > 0
    ? Math.max(...data.map((sku) => sku.revenue))
    : 1

  return (
    <div style={{
      background: 'var(--beige-section)',
      borderRadius: 14,
      padding: 24,
      boxShadow: 'var(--shadow-soft)',
    }}>
      <h3 style={{
        margin: '0 0 16px 0',
        fontSize: 15,
        fontWeight: 700,
        color: 'var(--gold-dark)',
        letterSpacing: '0.02em',
      }}>
        Top Selling SKUs
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {data.map((sku, index) => {
          const rankColor = RANK_COLORS[index % RANK_COLORS.length]
          const barWidth = (sku.revenue / maxRevenue) * 100

          return (
            <div key={sku.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* Rank badge */}
              <div style={{
                flexShrink: 0,
                width: 28,
                height: 28,
                borderRadius: 8,
                background: rankColor.bg,
                color: rankColor.text,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 800,
              }}>
                {index + 1}
              </div>

              {/* SKU info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: 4,
                }}>
                  <span style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--warm-black)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {sku.name}
                  </span>
                  <span style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'var(--gold-dark)',
                    flexShrink: 0,
                    marginLeft: 8,
                  }}>
                    {formatCurrencyShort(sku.revenue)}
                  </span>
                </div>

                {/* Progress bar */}
                <div style={{
                  height: 6,
                  borderRadius: 3,
                  background: 'rgba(188, 139, 87, 0.10)',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${barWidth}%`,
                    borderRadius: 3,
                    background: `linear-gradient(90deg, #BC8B57, #D4A76A)`,
                    transition: 'width 0.8s var(--ease-luxury)',
                  }} />
                </div>

                <div style={{
                  fontSize: 11,
                  color: 'var(--text-secondary)',
                  marginTop: 3,
                }}>
                  {formatNumber(sku.unitsSold)} units sold
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
