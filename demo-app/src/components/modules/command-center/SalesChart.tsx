import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { formatCurrencyShort } from '../../../utils/formatCurrency'

interface SalesTrendPoint {
  day: string
  sales: number
}

interface SalesChartProps {
  data: readonly SalesTrendPoint[]
}

function CustomTooltip({ active, payload, label }: {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}) {
  if (!active || !payload || payload.length === 0) return null

  return (
    <div style={{
      background: 'var(--warm-black)',
      color: '#fff',
      padding: '8px 14px',
      borderRadius: 8,
      fontSize: 13,
      fontWeight: 600,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    }}>
      <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, marginBottom: 2 }}>
        {label}
      </div>
      <div>{formatCurrencyShort(payload[0].value)}</div>
    </div>
  )
}

export default function SalesChart({ data }: SalesChartProps) {
  return (
    <div style={{
      background: 'var(--beige-section)',
      borderRadius: 14,
      padding: '24px 24px 16px',
      boxShadow: 'var(--shadow-soft)',
    }}>
      <h3 style={{
        margin: '0 0 20px 0',
        fontSize: 15,
        fontWeight: 700,
        color: 'var(--gold-dark)',
        letterSpacing: '0.02em',
      }}>
        Sales Trend (7 Days)
      </h3>

      <div style={{ width: '100%', height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={[...data]} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="goldGradientLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#BC8B57" />
                <stop offset="100%" stopColor="#D4A76A" />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(188, 139, 87, 0.12)"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v: number) => formatCurrencyShort(v)}
              tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={56}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="url(#goldGradientLine)"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: '#BC8B57',
                stroke: '#fff',
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: '#BC8B57',
                stroke: '#fff',
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
