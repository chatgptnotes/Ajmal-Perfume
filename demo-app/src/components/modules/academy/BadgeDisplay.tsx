import { motion } from 'framer-motion'

interface BadgeItem {
  name: string
  earned: boolean
}

const ALL_BADGES: BadgeItem[] = [
  { name: 'Oud Expert', earned: true },
  { name: 'Top Seller', earned: true },
  { name: 'Customer Champion', earned: true },
  { name: 'Bakhoor Master', earned: false },
  { name: '30-Day Streak', earned: false },
  { name: 'Regional Star', earned: false },
]

const BADGE_ICONS: Record<string, string> = {
  'Oud Expert': '🪔',
  'Top Seller': '🏆',
  'Customer Champion': '🤝',
  'Bakhoor Master': '🔥',
  '30-Day Streak': '⚡',
  'Regional Star': '⭐',
}

export default function BadgeDisplay() {
  return (
    <div style={{
      background: 'var(--beige-section)',
      borderRadius: 14,
      padding: '24px',
      boxShadow: 'var(--shadow-soft)',
    }}>
      <h3 style={{
        fontSize: 15,
        fontWeight: 700,
        color: 'var(--gold-dark)',
        marginBottom: 18,
        letterSpacing: '-0.01em',
      }}>
        Your Badges
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12,
      }}>
        {ALL_BADGES.map((badge, i) => (
          <motion.div
            key={badge.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08, duration: 0.35 }}
            whileHover={badge.earned ? { scale: 1.08, y: -3 } : undefined}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              padding: '16px 8px',
              borderRadius: 12,
              border: badge.earned
                ? '2px solid var(--gold-primary)'
                : '2px solid var(--border)',
              background: badge.earned
                ? 'rgba(188, 139, 87, 0.08)'
                : 'rgba(200, 200, 200, 0.1)',
              opacity: badge.earned ? 1 : 0.5,
              cursor: badge.earned ? 'pointer' : 'default',
              transition: 'box-shadow 0.25s var(--ease-luxury)',
              boxShadow: badge.earned ? 'var(--shadow-gold)' : 'none',
            }}
          >
            <span style={{ fontSize: 28 }}>
              {BADGE_ICONS[badge.name] ?? '🏅'}
            </span>
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              color: badge.earned ? 'var(--gold-dark)' : 'var(--text-muted)',
              textAlign: 'center',
              lineHeight: 1.25,
            }}>
              {badge.name}
            </span>
            {!badge.earned && (
              <span style={{
                fontSize: 9,
                color: 'var(--text-muted)',
                fontWeight: 600,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.08em',
              }}>
                Locked
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
