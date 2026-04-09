import { motion, AnimatePresence } from 'framer-motion'
import type { StaffMember } from '../../../config/types'

interface LeaderboardProps {
  staff: readonly StaffMember[]
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const PODIUM_COLORS: Record<number, { border: string; bg: string; label: string }> = {
  1: { border: '#E5AD23', bg: 'rgba(229, 173, 35, 0.12)', label: 'gold' },
  2: { border: '#A4A4A4', bg: 'rgba(164, 164, 164, 0.10)', label: 'silver' },
  3: { border: '#CD7F32', bg: 'rgba(205, 127, 50, 0.10)', label: 'bronze' },
}

function PodiumCard({ member, order }: { member: StaffMember; order: number }) {
  const colors = PODIUM_COLORS[member.rank] ?? PODIUM_COLORS[3]
  const isFirst = member.rank === 1
  const height = isFirst ? 180 : 155

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: order * 0.12, duration: 0.5, ease: [0, 0, 0.3, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        padding: '20px 16px',
        borderRadius: 16,
        border: `2px solid ${colors.border}`,
        background: colors.bg,
        minHeight: height,
        width: isFirst ? 180 : 155,
        boxShadow: isFirst ? 'var(--shadow-gold)' : 'var(--shadow-soft)',
        position: 'relative',
      }}
    >
      {isFirst && (
        <span style={{
          position: 'absolute',
          top: -14,
          fontSize: 24,
        }}>
          👑
        </span>
      )}

      <div style={{
        width: isFirst ? 56 : 48,
        height: isFirst ? 56 : 48,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${colors.border}, var(--gold-dark))`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: isFirst ? 18 : 15,
        fontWeight: 800,
        color: '#fff',
        letterSpacing: '-0.02em',
      }}>
        {getInitials(member.name)}
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: 14,
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '-0.01em',
        }}>
          {member.name.split(' ')[0]} {member.name.split(' ')[1]?.[0]}.
        </div>
        <div style={{
          fontSize: 11,
          color: 'var(--text-secondary)',
          marginTop: 2,
        }}>
          {member.store.split('—')[0].trim()} {member.city}
        </div>
      </div>

      <div style={{
        fontSize: 18,
        fontWeight: 800,
        color: 'var(--gold-dark)',
      }}>
        {member.xp.toLocaleString()} XP
      </div>

      {/* XP bar */}
      <div style={{
        width: '100%',
        height: 6,
        background: 'rgba(188, 139, 87, 0.15)',
        borderRadius: 3,
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, (member.xp / 3500) * 100)}%` }}
          transition={{ duration: 1.2, delay: 0.3 + order * 0.15, ease: [0, 0, 0.3, 1] }}
          style={{
            height: '100%',
            borderRadius: 3,
            background: 'linear-gradient(90deg, #BC8B57, #E5AD23)',
          }}
        />
      </div>

      {member.badges.length > 0 && (
        <div style={{
          fontSize: 10,
          color: 'var(--gold-primary)',
          fontWeight: 700,
          background: 'rgba(188, 139, 87, 0.1)',
          padding: '3px 8px',
          borderRadius: 6,
        }}>
          {member.badges[0]}
        </div>
      )}
    </motion.div>
  )
}

function RankRow({ member, index }: { member: StaffMember; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 + index * 0.06, duration: 0.35 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '12px 16px',
        borderRadius: 10,
        background: 'rgba(243, 236, 227, 0.6)',
        transition: 'background 0.2s',
      }}
    >
      <span style={{
        fontSize: 14,
        fontWeight: 800,
        color: 'var(--text-muted)',
        width: 24,
        textAlign: 'center',
      }}>
        #{member.rank}
      </span>

      <div style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: 'var(--sand)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 13,
        fontWeight: 700,
        color: 'var(--gold-dark)',
        flexShrink: 0,
      }}>
        {getInitials(member.name)}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 13,
          fontWeight: 700,
          color: 'var(--text-primary)',
        }}>
          {member.name}
        </div>
        <div style={{
          fontSize: 11,
          color: 'var(--text-secondary)',
        }}>
          {member.store.split('—')[0].trim()} {member.city}
        </div>
      </div>

      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{
          fontSize: 14,
          fontWeight: 800,
          color: 'var(--gold-dark)',
        }}>
          {member.xp.toLocaleString()} XP
        </div>
        <div style={{
          width: 80,
          height: 4,
          background: 'rgba(188, 139, 87, 0.12)',
          borderRadius: 2,
          overflow: 'hidden',
          marginTop: 4,
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (member.xp / 3500) * 100)}%` }}
            transition={{ duration: 1, delay: 0.5 + index * 0.08, ease: [0, 0, 0.3, 1] }}
            style={{
              height: '100%',
              borderRadius: 2,
              background: 'linear-gradient(90deg, #BC8B57, #E5AD23)',
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default function Leaderboard({ staff }: LeaderboardProps) {
  const sorted = [...staff].sort((a, b) => a.rank - b.rank)
  const top3 = sorted.slice(0, 3)
  const rest = sorted.slice(3, 10)

  // Reorder for podium display: #2, #1, #3
  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean)

  return (
    <div>
      {/* Podium */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: 16,
        marginBottom: 28,
        paddingTop: 20,
      }}>
        <AnimatePresence mode="popLayout">
          {podiumOrder.map((member, i) => (
            <PodiumCard key={member.id} member={member} order={i} />
          ))}
        </AnimatePresence>
      </div>

      {/* Ranked list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <AnimatePresence mode="popLayout">
          {rest.map((member, i) => (
            <RankRow key={member.id} member={member} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
