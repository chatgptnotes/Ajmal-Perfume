import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { StaffMember } from '../../../config/types'

interface ScorecardProps {
  member: StaffMember
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const MONTHS = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']

function generateTrendData(member: StaffMember): Array<{ month: string; sales: number }> {
  const base = member.salesPerHour
  return MONTHS.map((month, i) => ({
    month,
    sales: Math.round(base * (0.7 + i * 0.06 + Math.random() * 0.12)),
  }))
}

interface MetricItem {
  label: string
  value: string
  trend: number
}

function buildMetrics(member: StaffMember): MetricItem[] {
  return [
    { label: 'Sales/Hour', value: `₹${member.salesPerHour.toLocaleString()}`, trend: 8 },
    { label: 'Conversion', value: `${member.conversionRate}%`, trend: -2 },
    { label: 'Avg Basket', value: `₹${member.avgBasket.toLocaleString()}`, trend: 5 },
    { label: 'Upsell Rate', value: `${member.upsellRate}%`, trend: 12 },
  ]
}

const BADGE_ICONS: Record<string, string> = {
  'Oud Expert': '🪔',
  'Top Seller': '🏆',
  'Customer Champion': '🤝',
  'Product Master': '📚',
  'Upsell King': '👑',
  'POS Pro': '💻',
  'Bakhoor Master': '🔥',
  '15-Day Streak': '⚡',
  '30-Day Streak': '⚡',
  'Manager Elite': '🎖️',
  'Fast Learner': '🚀',
}

export default function Scorecard({ member }: ScorecardProps) {
  const metrics = buildMetrics(member)
  const trendData = generateTrendData(member)

  return (
    <div style={{
      background: 'var(--beige-section)',
      borderRadius: 16,
      padding: '28px',
      boxShadow: 'var(--shadow-card)',
    }}>
      {/* Profile Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        marginBottom: 24,
        paddingBottom: 20,
        borderBottom: '1px solid var(--sand)',
      }}>
        <div style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #BC8B57, #E5AD23)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
          fontWeight: 800,
          color: '#fff',
          flexShrink: 0,
        }}>
          {getInitials(member.name)}
        </div>
        <div>
          <h2 style={{
            fontSize: 20,
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}>
            {member.name}
          </h2>
          <div style={{
            fontSize: 13,
            color: 'var(--text-secondary)',
            marginTop: 2,
          }}>
            {member.role} — {member.store}
          </div>
          <div style={{
            fontSize: 11,
            color: 'var(--text-muted)',
            marginTop: 2,
          }}>
            Joined {new Date(member.joinDate).toLocaleDateString('en-IN', {
              month: 'short',
              year: 'numeric',
            })}
          </div>
        </div>
      </div>

      {/* 2x2 Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
        marginBottom: 24,
      }}>
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.35 }}
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: '18px 16px',
              border: '1px solid var(--sand)',
            }}
          >
            <div style={{
              fontSize: 11,
              fontWeight: 600,
              color: 'var(--text-secondary)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase' as const,
              marginBottom: 6,
            }}>
              {metric.label}
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 8,
            }}>
              <span style={{
                fontSize: 24,
                fontWeight: 800,
                color: 'var(--gold-dark)',
                letterSpacing: '-0.02em',
              }}>
                {metric.value}
              </span>
              <span style={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                fontSize: 12,
                fontWeight: 600,
                color: metric.trend >= 0 ? 'var(--success)' : 'var(--error)',
              }}>
                {metric.trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {metric.trend >= 0 ? '+' : ''}{metric.trend}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Performance Trend Chart */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{
          fontSize: 14,
          fontWeight: 700,
          color: 'var(--gold-dark)',
          marginBottom: 14,
        }}>
          6-Month Performance Trend
        </h3>
        <div style={{
          background: '#fff',
          borderRadius: 12,
          padding: '16px 12px 8px',
          border: '1px solid var(--sand)',
        }}>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--sand)" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: 'var(--text-secondary)' }}
                axisLine={{ stroke: 'var(--sand)' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `₹${(v / 1000).toFixed(1)}k`}
              />
              <Tooltip
                formatter={(value) => [`₹${Number(value ?? 0).toLocaleString()}`, 'Sales/Hr']}
                contentStyle={{
                  borderRadius: 8,
                  border: '1px solid var(--sand)',
                  fontSize: 12,
                  boxShadow: 'var(--shadow-soft)',
                }}
              />
              <Bar
                dataKey="sales"
                radius={[6, 6, 0, 0]}
                fill="url(#goldGradient)"
              />
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E5AD23" />
                  <stop offset="100%" stopColor="#BC8B57" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Certification Badges */}
      {member.badges.length > 0 && (
        <div>
          <h3 style={{
            fontSize: 14,
            fontWeight: 700,
            color: 'var(--gold-dark)',
            marginBottom: 12,
          }}>
            Certifications
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {member.badges.map((badge) => (
              <motion.span
                key={badge}
                whileHover={{ scale: 1.06 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '6px 14px',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'var(--gold-dark)',
                  background: 'rgba(188, 139, 87, 0.1)',
                  border: '1.5px solid var(--gold-primary)',
                  cursor: 'default',
                }}
              >
                <span>{BADGE_ICONS[badge] ?? '🏅'}</span>
                {badge}
              </motion.span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
