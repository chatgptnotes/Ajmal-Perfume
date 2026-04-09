import { Check, CreditCard, Smartphone, Wallet, Banknote, Search, Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { formatCurrencyFull } from '../../../utils/formatCurrency'

const CART_ITEMS = [
  { name: 'Dahn Al Oudh 50ml', price: 6500, qty: 1, category: 'EDP' },
  { name: 'Wisal EDP 50ml', price: 2400, qty: 1, category: 'EDP' },
  { name: 'Bakhoor Al Mas', price: 850, qty: 2, category: 'Bakhoor' },
]

const QUICK_PRODUCTS = [
  { name: 'Dahn Al Oudh', price: 6500 },
  { name: 'Amber Wood', price: 3200 },
  { name: 'Sacrifice', price: 4200 },
  { name: 'Wisal', price: 2400 },
  { name: 'Evoke Gold', price: 1800 },
  { name: 'Silver Shade', price: 1200 },
  { name: 'Bakhoor Al Mas', price: 850 },
  { name: 'Musk Rose Mist', price: 375 },
]

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', icon: Smartphone },
  { id: 'card', label: 'Card', icon: CreditCard },
  { id: 'cash', label: 'Cash', icon: Banknote },
  { id: 'wallet', label: 'Wallet', icon: Wallet },
]

export default function SmartPOS() {
  const [selectedPayment, setSelectedPayment] = useState('upi')

  const subtotal = CART_ITEMS.reduce((sum, item) => sum + item.price * item.qty, 0)
  const discount = subtotal >= 5000 ? Math.round(subtotal * 0.1) : 0
  const afterDiscount = subtotal - discount
  const gst = Math.round(afterDiscount * 0.18)
  const total = afterDiscount + gst

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--gold-dark)', marginBottom: 4 }}>
        Smart POS
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
        The Nerve Center of Every Store
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* LEFT: Current Transaction */}
        <div style={{ background: 'white', borderRadius: 12, padding: 28, boxShadow: 'var(--shadow-card)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--gold-dark)' }}>Current Transaction</h2>
            <span style={{
              fontSize: 12, fontWeight: 600, color: 'var(--gold-primary)',
              background: 'rgba(188,139,87,0.1)', padding: '4px 12px', borderRadius: 20,
            }}>
              Arjun Mehta — Gold Member
            </span>
          </div>

          {/* Items */}
          <div style={{ marginBottom: 16 }}>
            {CART_ITEMS.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 0', borderBottom: '1px solid var(--beige-section)',
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.category}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button style={{ background: 'var(--beige-section)', border: 'none', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Minus size={12} />
                    </button>
                    <span style={{ fontSize: 14, fontWeight: 600, minWidth: 20, textAlign: 'center' as const }}>{item.qty}</span>
                    <button style={{ background: 'var(--beige-section)', border: 'none', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Plus size={12} />
                    </button>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--gold-dark)', minWidth: 80, textAlign: 'right' as const }}>
                    {formatCurrencyFull(item.price * item.qty)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Promo Banner */}
          {discount > 0 && (
            <div style={{
              background: 'rgba(0, 148, 15, 0.08)', border: '1px solid rgba(0, 148, 15, 0.2)',
              borderRadius: 10, padding: '10px 16px', marginBottom: 16,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <Check size={16} style={{ color: 'var(--success)' }} />
              <span style={{ fontSize: 13, color: 'var(--success)', fontWeight: 600 }}>
                Festival Offer: 10% off on 3+ items — {formatCurrencyFull(discount)} saved!
              </span>
            </div>
          )}

          {/* Totals */}
          <div style={{ borderTop: '2px solid var(--beige-section)', paddingTop: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>
              <span>Subtotal</span><span>{formatCurrencyFull(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--success)', marginBottom: 6 }}>
                <span>Discount (10%)</span><span>-{formatCurrencyFull(discount)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>
              <span>GST (18%)</span><span>{formatCurrencyFull(gst)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 28, fontWeight: 800, color: 'var(--gold-dark)' }}>
              <span>TOTAL</span><span>{formatCurrencyFull(total)}</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Quick Actions */}
        <div>
          {/* Search */}
          <div style={{
            background: 'white', borderRadius: 12, padding: '12px 20px', marginBottom: 16,
            display: 'flex', alignItems: 'center', gap: 12, boxShadow: 'var(--shadow-soft)',
            border: '1px solid var(--sand)',
          }}>
            <Search size={18} style={{ color: 'var(--text-muted)' }} />
            <input placeholder="Search products..." style={{
              border: 'none', outline: 'none', fontSize: 14, flex: 1,
              background: 'transparent', color: 'var(--text-primary)',
            }} />
          </div>

          {/* Quick Products */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
            {QUICK_PRODUCTS.map((p, i) => (
              <div key={i} style={{
                background: 'white', borderRadius: 10, padding: '14px 16px',
                boxShadow: 'var(--shadow-soft)', cursor: 'pointer',
                border: '1px solid transparent',
                transition: 'all 0.2s ease',
              }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</div>
                <div style={{ fontSize: 12, color: 'var(--gold-primary)', fontWeight: 600, marginTop: 2 }}>
                  {formatCurrencyFull(p.price)}
                </div>
              </div>
            ))}
          </div>

          {/* Payment Methods */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            {PAYMENT_METHODS.map((pm) => {
              const Icon = pm.icon
              const isActive = selectedPayment === pm.id
              return (
                <button key={pm.id} onClick={() => setSelectedPayment(pm.id)} style={{
                  flex: 1, padding: '12px 8px', borderRadius: 10, cursor: 'pointer',
                  background: isActive ? 'rgba(188,139,87,0.12)' : 'white',
                  border: isActive ? '2px solid var(--gold-primary)' : '1px solid var(--sand)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  color: isActive ? 'var(--gold-dark)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 600 : 400, fontSize: 12, transition: 'all 0.2s ease',
                }}>
                  <Icon size={20} />
                  {pm.label}
                </button>
              )
            })}
          </div>

          {/* Complete Button */}
          <button style={{
            width: '100%', padding: '18px 32px', borderRadius: 50,
            background: 'var(--gold-primary)', color: 'white',
            fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: 'var(--shadow-gold)',
            transition: 'all 0.3s var(--ease-luxury)',
          }}>
            <Check size={20} />
            Complete Transaction
          </button>
        </div>
      </div>

      {/* Bottom Status */}
      <div style={{
        marginTop: 20, padding: '10px 20px', background: 'var(--beige-section)',
        borderRadius: 8, fontSize: 12, color: 'var(--text-muted)',
        display: 'flex', justifyContent: 'space-between',
      }}>
        <span>Store 12 — Juhu, Mumbai</span>
        <span>Terminal 3</span>
        <span style={{ color: 'var(--success)' }}>Synced ✓</span>
        <span>Today: 47 transactions</span>
      </div>
    </div>
  )
}
