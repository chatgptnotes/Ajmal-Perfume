import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { formatCurrencyShort } from '../../../utils/formatCurrency'

interface StoreEntry {
  name: string
  city: string
  sales: number
}

interface TopStoresProps {
  data: readonly StoreEntry[]
}

const GOLD_SHADES = [
  '#BC8B57',
  '#C99A66',
  '#D4A76A',
  '#DFB87E',
  '#E8C892',
]

function CustomTooltip({ active, payload }: {
  active?: boolean
  payload?: Array<{ payload: StoreEntry }>
}) {
  if (!active || !payload || payload.length === 0) return null

  const store = payload[0].payload
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
        {store.city}
      </div>
      <div>{formatCurrencyShort(store.sales)}</div>
    </div>
  )
}

export default function TopStores({ data }: TopStoresProps) {
  // Shorten store names for chart labels
  const chartData = data.map((store) => ({
    ...store,
    shortName: store.name.replace(/^Store \d+ — /, ''),
  }))

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
        Top 5 Stores
      </h3>

      <div style={{ width: '100%', height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 4, right: 12, left: 0, bottom: 0 }}
          >
            <XAxis
              type="number"
              tickFormatter={(v: number) => formatCurrencyShort(v)}
              tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="shortName"
              tick={{ fill: 'var(--warm-black)', fontSize: 12, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              width={100}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="sales"
              radius={[0, 6, 6, 0]}
              barSize={24}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={GOLD_SHADES[index % GOLD_SHADES.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
