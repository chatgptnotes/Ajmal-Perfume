import { Send, Phone, Paperclip, Smile } from 'lucide-react'

const CONVERSATIONS = [
  { name: 'Priya Sharma', lastMsg: 'Hi Priya, running low on Wisal?', time: '10:23 AM', unread: 0, segment: 'VIP' },
  { name: 'Arjun Mehta', lastMsg: 'Your order has been confirmed!', time: '9:45 AM', unread: 0, segment: 'Regular' },
  { name: 'Fatima Khan', lastMsg: 'New Sacrifice II — exclusive preview', time: 'Yesterday', unread: 1, segment: 'VIP' },
  { name: 'Rahul Deshmukh', lastMsg: 'We miss you! 15% off your next visit', time: 'Yesterday', unread: 0, segment: 'Lapsed' },
  { name: 'Meera Krishnan', lastMsg: 'Welcome to Ajmal! Discover our range', time: 'Apr 2', unread: 0, segment: 'New' },
]

const ACTIVE_CHAT = [
  { from: 'bot', text: 'Hi Priya! 👋 Thank you for being a valued Ajmal customer.', time: '10:20 AM', type: 'auto' },
  { from: 'bot', text: 'We noticed you purchased Wisal 50ml on March 2nd. Based on typical usage, you might be running low!', time: '10:20 AM', type: 'ai' },
  { from: 'bot', text: '✨ Reorder Wisal 50ml — ₹2,400\n\nPlus, explore our Spring Collection:\n🌸 New Aurum Limited Edition — ₹3,200\n🌿 Fresh Garden Mist — ₹475\n\nReply YES to reorder Wisal, or BROWSE to see the full collection.', time: '10:21 AM', type: 'auto' },
  { from: 'user', text: 'YES please! Also interested in the Aurum edition', time: '10:23 AM', type: 'user' },
  { from: 'bot', text: 'Great choice! 🎉 Your Wisal reorder is confirmed.\n\nFor Aurum Limited Edition, I can:\n1️⃣ Reserve one at your nearest store (Store 8, Koramangala)\n2️⃣ Ship directly to you (free delivery for VIP members!)\n\nWhich do you prefer?', time: '10:23 AM', type: 'ai' },
]

const CAMPAIGNS = [
  { name: 'Eid Collection Preview', audience: 'All oud buyers from last Eid', sent: 2840, opened: '68%', converted: '12%', status: 'completed' },
  { name: 'Restock Reminders — March', audience: 'Predicted reorder cycle match', sent: 1420, opened: '72%', converted: '18%', status: 'completed' },
  { name: 'Win-back: 60-day inactive', audience: 'Lapsed high-value customers', sent: 142, opened: '45%', converted: '8%', status: 'active' },
]

export default function WhatsAppCRM() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--gold-dark)', marginBottom: 4 }}>
        WhatsApp CRM
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
        Know Your Customer. Reach Them. Keep Them.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 320px', gap: 16, height: 520 }}>
        {/* Contact List */}
        <div style={{ background: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: 'var(--shadow-soft)' }}>
          <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--beige-section)', fontSize: 14, fontWeight: 700, color: 'var(--gold-dark)' }}>
            Conversations
          </div>
          {CONVERSATIONS.map((c, i) => (
            <div key={i} style={{
              padding: '12px 18px', borderBottom: '1px solid var(--beige-section)',
              background: i === 0 ? 'rgba(188,139,87,0.08)' : 'transparent', cursor: 'pointer',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.time}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 180 }}>{c.lastMsg}</span>
                {c.unread > 0 && <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--gold-primary)', color: 'white', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.unread}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Window */}
        <div style={{ background: '#F0E6DB', borderRadius: 12, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: 'var(--shadow-soft)' }}>
          <div style={{ padding: '12px 20px', background: 'white', borderBottom: '1px solid var(--sand)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #BC8B57, #E5AD23)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14 }}>PS</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Priya Sharma</div>
              <div style={{ fontSize: 11, color: 'var(--success)' }}>Online</div>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <Phone size={18} style={{ color: 'var(--text-muted)' }} />
            </div>
          </div>

          <div style={{ flex: 1, padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {ACTIVE_CHAT.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '75%',
              }}>
                <div style={{
                  background: msg.from === 'user' ? '#BC8B57' : 'white',
                  color: msg.from === 'user' ? 'white' : 'var(--text-primary)',
                  borderRadius: msg.from === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                  padding: '10px 14px', fontSize: 13, lineHeight: 1.5,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)', whiteSpace: 'pre-line',
                }}>
                  {msg.type === 'ai' && <span style={{ fontSize: 10, color: msg.from === 'user' ? 'rgba(255,255,255,0.7)' : 'var(--gold-primary)', fontWeight: 600, display: 'block', marginBottom: 4 }}>AI Generated</span>}
                  {msg.text}
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2, textAlign: msg.from === 'user' ? 'right' : 'left' as const }}>{msg.time}</div>
              </div>
            ))}
          </div>

          <div style={{ padding: '10px 16px', background: 'white', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Paperclip size={18} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} />
            <Smile size={18} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} />
            <input placeholder="Type a message..." style={{
              flex: 1, border: 'none', outline: 'none', fontSize: 14, padding: '8px 12px',
              background: 'var(--beige-section)', borderRadius: 20,
            }} />
            <button style={{ background: 'var(--gold-primary)', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Send size={16} style={{ color: 'white' }} />
            </button>
          </div>
        </div>

        {/* Campaign Stats */}
        <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: 'var(--shadow-soft)', overflowY: 'auto' }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--gold-dark)', marginBottom: 16 }}>Active Campaigns</h3>
          {CAMPAIGNS.map((c, i) => (
            <div key={i} style={{ background: 'var(--beige-section)', borderRadius: 10, padding: 16, marginBottom: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{c.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>{c.audience}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--gold-dark)' }}>{c.sent.toLocaleString()}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Sent</div>
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--gold-primary)' }}>{c.opened}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Opened</div>
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--success)' }}>{c.converted}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Converted</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
