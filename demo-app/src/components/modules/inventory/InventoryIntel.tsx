import { AlertTriangle, CheckCircle, Package, Camera } from 'lucide-react'
import { formatCurrencyFull, formatNumber } from '../../../utils/formatCurrency'

const INVENTORY_DATA = [
  { sku: 'Dahn Al Oudh 50ml', stock: 45, reorderPoint: 60, status: 'low', stores: 6, value: 292500 },
  { sku: 'Amber Wood 75ml', stock: 320, reorderPoint: 200, status: 'ok', stores: 0, value: 1024000 },
  { sku: 'Sacrifice 50ml', stock: 78, reorderPoint: 80, status: 'low', stores: 3, value: 327600 },
  { sku: 'Wisal 50ml', stock: 410, reorderPoint: 250, status: 'ok', stores: 0, value: 984000 },
  { sku: 'Eid Gift Set Premium', stock: 52, reorderPoint: 150, status: 'critical', stores: 14, value: 390000 },
  { sku: 'Evoke Gold 75ml', stock: 285, reorderPoint: 180, status: 'ok', stores: 0, value: 513000 },
  { sku: 'Bakhoor Al Mas', stock: 190, reorderPoint: 120, status: 'ok', stores: 0, value: 161500 },
  { sku: 'Musk Rose Mist 250ml', stock: 540, reorderPoint: 200, status: 'overstock', stores: 0, value: 202500 },
]

const STATUS_CONFIG = {
  critical: { color: '#BE4040', bg: 'rgba(190,64,64,0.08)', label: 'Critical' },
  low: { color: '#E5AD23', bg: 'rgba(229,173,35,0.08)', label: 'Low Stock' },
  ok: { color: '#00940F', bg: 'rgba(0,148,15,0.08)', label: 'In Stock' },
  overstock: { color: '#727272', bg: 'rgba(114,114,114,0.08)', label: 'Overstock' },
}

const DEAD_STOCK = [
  { sku: 'Legacy Attar Collection', stores: 14, daysSinceLastSale: 67, units: 42 },
  { sku: 'Summer Mist 2024', stores: 8, daysSinceLastSale: 85, units: 120 },
]

export default function InventoryIntel() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--gold-dark)', marginBottom: 4 }}>
        Inventory Intelligence
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
        Every Shelf, Every Store, Every SKU
      </p>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total SKUs Tracked', value: '248', icon: Package },
          { label: 'Below Reorder Point', value: '23', color: 'var(--warning)', icon: AlertTriangle },
          { label: 'Vision Audits Today', value: '12', icon: Camera },
          { label: 'Auto-Replenish Triggers', value: '8', icon: CheckCircle },
        ].map((s, i) => (
          <div key={i} style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: 'var(--shadow-soft)' }}>
            <s.icon size={20} style={{ color: s.color || 'var(--gold-primary)', marginBottom: 8 }} />
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color || 'var(--gold-dark)' }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Inventory Table */}
      <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: 'var(--shadow-card)', marginBottom: 20 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--gold-dark)', marginBottom: 16 }}>SKU Stock Levels</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--beige-section)' }}>
              {['SKU', 'Stock', 'Reorder Point', 'Status', 'Stores Affected', 'Stock Value'].map(h => (
                <th key={h} style={{ padding: '10px 12px', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textAlign: 'left' as const, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INVENTORY_DATA.map((item, i) => {
              const cfg = STATUS_CONFIG[item.status as keyof typeof STATUS_CONFIG]
              const fillPct = Math.min((item.stock / item.reorderPoint) * 100, 100)
              return (
                <tr key={i} style={{ borderBottom: '1px solid var(--beige-section)' }}>
                  <td style={{ padding: '12px', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{item.sku}</td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 60, height: 6, background: 'var(--beige-section)', borderRadius: 3 }}>
                        <div style={{ width: `${fillPct}%`, height: '100%', background: cfg.color, borderRadius: 3, transition: 'width 0.5s ease' }} />
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{formatNumber(item.stock)}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px', fontSize: 13, color: 'var(--text-secondary)' }}>{formatNumber(item.reorderPoint)}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                  </td>
                  <td style={{ padding: '12px', fontSize: 13, color: item.stores > 0 ? 'var(--error)' : 'var(--text-muted)', fontWeight: item.stores > 0 ? 600 : 400 }}>
                    {item.stores > 0 ? `${item.stores} stores` : '—'}
                  </td>
                  <td style={{ padding: '12px', fontSize: 13, fontWeight: 600, color: 'var(--gold-dark)' }}>{formatCurrencyFull(item.value)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Dead Stock */}
      <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: 'var(--shadow-soft)' }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--error)', marginBottom: 16 }}>Dead Stock Alerts</h2>
        {DEAD_STOCK.map((d, i) => (
          <div key={i} style={{
            background: 'rgba(190,64,64,0.05)', borderRadius: 10, padding: '14px 18px',
            marginBottom: 8, border: '1px solid rgba(190,64,64,0.15)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{d.sku}</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 12 }}>
                {d.units} units across {d.stores} stores — no sale in {d.daysSinceLastSale} days
              </span>
            </div>
            <button style={{
              background: 'var(--error)', color: 'white', border: 'none', borderRadius: 20,
              padding: '6px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}>Markdown</button>
          </div>
        ))}
      </div>
    </div>
  )
}
