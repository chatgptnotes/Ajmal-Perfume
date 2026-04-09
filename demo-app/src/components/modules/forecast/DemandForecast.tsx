import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts'

const FORECAST_DATA = [
  { week: 'W1 Feb', actual: 380, predicted: 370 },
  { week: 'W2 Feb', actual: 395, predicted: 390 },
  { week: 'W3 Feb', actual: 410, predicted: 415 },
  { week: 'W4 Feb', actual: 425, predicted: 420 },
  { week: 'W1 Mar', actual: 440, predicted: 450 },
  { week: 'W2 Mar', actual: 480, predicted: 470 },
  { week: 'W3 Mar', actual: 520, predicted: 530 },
  { week: 'W4 Mar', actual: 580, predicted: 590 },
  { week: 'W1 Apr', actual: null, predicted: 720 },
  { week: 'W2 Apr', actual: null, predicted: 850 },
  { week: 'Eid Week', actual: null, predicted: 1100 },
  { week: 'W4 Apr', actual: null, predicted: 680 },
]

const REGIONAL_DEMAND = [
  { region: 'North India', topSKU: 'Dahn Al Oudh', spike: 'Eid (4-6 wks before)', growth: '+45%' },
  { region: 'South India', topSKU: 'Amber Wood', spike: 'Wedding Season (Oct-Feb)', growth: '+32%' },
  { region: 'West India', topSKU: 'Sacrifice', spike: 'Diwali + Eid', growth: '+38%' },
  { region: 'East India', topSKU: 'Wisal', spike: 'Durga Puja (Sep-Oct)', growth: '+28%' },
]

export default function DemandForecast() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--gold-dark)', marginBottom: 4 }}>
        Demand Forecasting
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
        Know What Will Sell, Where, Before It Happens
      </p>

      {/* Forecast Chart */}
      <div style={{ background: 'white', borderRadius: 12, padding: 24, marginBottom: 20, boxShadow: 'var(--shadow-card)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--gold-dark)' }}>
            Oud Category — Demand Forecast (Units/Week)
          </h2>
          <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 12, height: 3, background: '#BC8B57', borderRadius: 2 }} /> Actual
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 12, height: 3, background: '#E5AD23', borderRadius: 2, borderStyle: 'dashed', borderWidth: 1 }} /> Predicted
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={FORECAST_DATA}>
            <defs>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#BC8B57" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#BC8B57" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4D5C7" />
            <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#727272' }} />
            <YAxis tick={{ fontSize: 11, fill: '#727272' }} />
            <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E4D5C7' }} />
            <ReferenceLine x="Eid Week" stroke="#BE4040" strokeDasharray="4 4" label={{ value: 'Eid Peak', fill: '#BE4040', fontSize: 11 }} />
            <Area type="monotone" dataKey="predicted" stroke="#E5AD23" strokeDasharray="6 3" fill="goldGradient" strokeWidth={2} />
            <Line type="monotone" dataKey="actual" stroke="#BC8B57" strokeWidth={2.5} dot={{ fill: '#BC8B57', r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
        <div style={{
          marginTop: 12, padding: '10px 16px', background: 'rgba(188,139,87,0.08)',
          borderRadius: 8, fontSize: 13, color: 'var(--gold-dark)',
        }}>
          AI Alert: Oud demand predicted to spike 90% during Eid week. System flagged 8 weeks ahead for stock preparation.
        </div>
      </div>

      {/* Regional Demand */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16 }}>
        {REGIONAL_DEMAND.map((r, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: 12, padding: 20, boxShadow: 'var(--shadow-soft)',
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--gold-dark)', marginBottom: 12 }}>{r.region}</h3>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Top SKU</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>{r.topSKU}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Peak Season</div>
            <div style={{ fontSize: 13, color: 'var(--text-primary)', marginBottom: 12 }}>{r.spike}</div>
            <div style={{
              fontSize: 20, fontWeight: 800, color: 'var(--success)',
            }}>{r.growth}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>YoY Growth</div>
          </div>
        ))}
      </div>
    </div>
  )
}
