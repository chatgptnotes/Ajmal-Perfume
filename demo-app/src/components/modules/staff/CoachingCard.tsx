import { motion } from 'framer-motion'
import { Brain, BookOpen, Calendar, History } from 'lucide-react'
import type { StaffMember } from '../../../config/types'

interface CoachingCardProps {
  member: StaffMember
}

function generateRecommendation(member: StaffMember): string {
  if (member.upsellRate < 25) {
    return `${member.name.split(' ')[0]}'s conversion is solid at ${member.conversionRate}%, but upsell rate (${member.upsellRate}%) is below the team average of 28%. Recommend enrolling in the Cross-sell Mastery module to build layering techniques with oud and bakhoor pairings.`
  }
  if (member.conversionRate < 30) {
    return `${member.name.split(' ')[0]} maintains a strong basket size (₹${member.avgBasket.toLocaleString()}) but conversion (${member.conversionRate}%) needs attention. The Greeting & Discovery Workshop would help improve initial customer engagement.`
  }
  if (member.salesPerHour > 4500) {
    return `${member.name.split(' ')[0]} is a top-tier performer across all metrics. Consider fast-tracking to Store Manager role or assigning as a Regional Trainer to amplify their impact across the network.`
  }
  return `${member.name.split(' ')[0]} shows consistent performance. Focus on ${member.upsellRate < 30 ? 'upselling techniques' : 'advanced fragrance consultation'} to reach the next tier. ${member.streak > 10 ? 'Strong learning streak — momentum is building.' : 'Re-engage with daily challenges to build learning consistency.'}`
}

interface ActionButton {
  icon: React.ReactNode
  label: string
  primary: boolean
}

const ACTIONS: ActionButton[] = [
  { icon: <BookOpen size={15} />, label: 'Assign Training', primary: true },
  { icon: <Calendar size={15} />, label: 'Schedule 1:1', primary: false },
  { icon: <History size={15} />, label: 'View History', primary: false },
]

export default function CoachingCard({ member }: CoachingCardProps) {
  const recommendation = generateRecommendation(member)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      style={{
        background: 'var(--beige-section)',
        borderRadius: 16,
        padding: '28px',
        boxShadow: 'var(--shadow-card)',
        border: '1px solid rgba(188, 139, 87, 0.2)',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        marginBottom: 20,
      }}>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: 'linear-gradient(135deg, #BC8B57, #E5AD23)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-gold)',
        }}>
          <Brain size={22} color="#fff" />
        </div>
        <div>
          <h3 style={{
            fontSize: 16,
            fontWeight: 800,
            color: 'var(--gold-dark)',
            letterSpacing: '-0.02em',
          }}>
            AI Coaching Insight
          </h3>
          <p style={{
            fontSize: 11,
            color: 'var(--text-muted)',
            fontWeight: 500,
          }}>
            Personalized recommendation
          </p>
        </div>
      </div>

      {/* Recommendation Text */}
      <div style={{
        background: '#fff',
        borderRadius: 12,
        padding: '18px 20px',
        marginBottom: 20,
        border: '1px solid var(--sand)',
        lineHeight: 1.65,
      }}>
        <p style={{
          fontSize: 13,
          color: 'var(--text-primary)',
          fontWeight: 500,
        }}>
          {recommendation}
        </p>
      </div>

      {/* Manager Note (from data) */}
      <div style={{
        background: 'rgba(188, 139, 87, 0.06)',
        borderRadius: 10,
        padding: '14px 18px',
        marginBottom: 22,
        borderLeft: '3px solid var(--gold-primary)',
      }}>
        <div style={{
          fontSize: 10,
          fontWeight: 700,
          color: 'var(--gold-primary)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
          marginBottom: 6,
        }}>
          Manager Note
        </div>
        <p style={{
          fontSize: 12,
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
          fontStyle: 'italic',
        }}>
          "{member.coachingNote}"
        </p>
      </div>

      {/* XP & Streak */}
      <div style={{
        display: 'flex',
        gap: 12,
        marginBottom: 22,
      }}>
        <div style={{
          flex: 1,
          background: '#fff',
          borderRadius: 10,
          padding: '14px 16px',
          border: '1px solid var(--sand)',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: 20,
            fontWeight: 800,
            color: 'var(--gold-dark)',
          }}>
            {member.xp.toLocaleString()}
          </div>
          <div style={{
            fontSize: 10,
            fontWeight: 600,
            color: 'var(--text-muted)',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.06em',
            marginTop: 2,
          }}>
            Total XP
          </div>
        </div>
        <div style={{
          flex: 1,
          background: '#fff',
          borderRadius: 10,
          padding: '14px 16px',
          border: '1px solid var(--sand)',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: 20,
            fontWeight: 800,
            color: member.streak > 0 ? 'var(--gold-dark)' : 'var(--text-muted)',
          }}>
            {member.streak > 0 ? `${member.streak} Days` : 'None'}
          </div>
          <div style={{
            fontSize: 10,
            fontWeight: 600,
            color: 'var(--text-muted)',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.06em',
            marginTop: 2,
          }}>
            Streak
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: 10,
      }}>
        {ACTIONS.map((action) => (
          <button
            key={action.label}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 7,
              padding: '11px 14px',
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.25s var(--ease-luxury)',
              border: action.primary
                ? 'none'
                : '1.5px solid var(--sand)',
              background: action.primary
                ? 'linear-gradient(90deg, #BC8B57, #E5AD23)'
                : '#fff',
              color: action.primary
                ? '#fff'
                : 'var(--text-secondary)',
              boxShadow: action.primary
                ? 'var(--shadow-gold)'
                : 'none',
            }}
          >
            {action.icon}
            {action.label}
          </button>
        ))}
      </div>
    </motion.div>
  )
}
