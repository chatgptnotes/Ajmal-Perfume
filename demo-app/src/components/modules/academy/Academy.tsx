import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { staff } from '../../../config'
import Leaderboard from './Leaderboard'
import BadgeDisplay from './BadgeDisplay'

type TimePeriod = 'This Week' | 'This Month' | 'All Time'
type Tab = 'Leaderboard' | 'My Learning' | 'Certifications' | 'Team Battles'

const TABS: Tab[] = ['Leaderboard', 'My Learning', 'Certifications', 'Team Battles']
const TIME_PILLS: TimePeriod[] = ['This Week', 'This Month', 'All Time']

function xpMultiplier(period: TimePeriod): number {
  if (period === 'This Month') return 2.8
  if (period === 'All Time') return 5.2
  return 1
}

export default function Academy() {
  const [activeTab, setActiveTab] = useState<Tab>('Leaderboard')
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('This Week')

  const adjustedStaff = staff.map((member) => ({
    ...member,
    xp: Math.round(member.xp * xpMultiplier(timePeriod)),
  }))

  const reranked = [...adjustedStaff]
    .sort((a, b) => b.xp - a.xp)
    .map((m, i) => ({ ...m, rank: i + 1 }))

  return (
    <div style={{ padding: '0 0 40px' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        marginBottom: 6,
      }}>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: 'linear-gradient(135deg, #BC8B57, #E5AD23)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <GraduationCap size={22} color="#fff" />
        </div>
        <div>
          <h1 style={{
            fontSize: 26,
            fontWeight: 800,
            color: 'var(--gold-dark)',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
          }}>
            Bettroi Academy
          </h1>
          <p style={{
            fontSize: 13,
            color: 'var(--text-secondary)',
            fontWeight: 500,
          }}>
            Where Your Team Levels Up
          </p>
        </div>
      </div>

      {/* Tab Bar */}
      <div style={{
        display: 'flex',
        gap: 0,
        borderBottom: '2px solid var(--sand)',
        marginBottom: 20,
        marginTop: 20,
      }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 22px',
              fontSize: 13,
              fontWeight: activeTab === tab ? 700 : 500,
              color: activeTab === tab ? 'var(--gold-dark)' : 'var(--text-secondary)',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab ? '3px solid var(--gold-primary)' : '3px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.25s var(--ease-luxury)',
              marginBottom: -2,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Time Filter Pills */}
      <div style={{
        display: 'flex',
        gap: 8,
        marginBottom: 28,
      }}>
        {TIME_PILLS.map((pill) => (
          <button
            key={pill}
            onClick={() => setTimePeriod(pill)}
            style={{
              padding: '8px 18px',
              fontSize: 12,
              fontWeight: 700,
              color: timePeriod === pill ? '#fff' : 'var(--text-secondary)',
              background: timePeriod === pill
                ? 'linear-gradient(90deg, #BC8B57, #E5AD23)'
                : 'var(--beige-section)',
              border: timePeriod === pill
                ? 'none'
                : '1px solid var(--sand)',
              borderRadius: 20,
              cursor: 'pointer',
              transition: 'all 0.25s var(--ease-luxury)',
              letterSpacing: '0.02em',
            }}
          >
            {pill}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'Leaderboard' && (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 1fr',
              gap: 28,
              alignItems: 'start',
            }}
          >
            {/* Left: Leaderboard */}
            <div style={{
              background: 'var(--beige-section)',
              borderRadius: 16,
              padding: '28px',
              boxShadow: 'var(--shadow-card)',
            }}>
              <Leaderboard staff={reranked} />
            </div>

            {/* Right: Badges, Streak, Battle */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <BadgeDisplay />

              {/* Active Streak */}
              <div style={{
                background: 'var(--beige-section)',
                borderRadius: 14,
                padding: '22px 24px',
                boxShadow: 'var(--shadow-soft)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 8,
                }}>
                  <span style={{ fontSize: 28 }}>🔥</span>
                  <div>
                    <div style={{
                      fontSize: 24,
                      fontWeight: 800,
                      color: 'var(--gold-dark)',
                      letterSpacing: '-0.02em',
                    }}>
                      12 Days
                    </div>
                    <div style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: 'var(--gold-primary)',
                    }}>
                      Active Streak
                    </div>
                  </div>
                </div>
                <p style={{
                  fontSize: 12,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                }}>
                  You're on fire! Complete today's module to keep your streak going.
                  Only 18 days to earn the 30-Day Streak badge!
                </p>
              </div>

              {/* Store Battle */}
              <div style={{
                background: 'var(--beige-section)',
                borderRadius: 14,
                padding: '22px 24px',
                boxShadow: 'var(--shadow-soft)',
              }}>
                <h3 style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: 'var(--gold-dark)',
                  marginBottom: 4,
                }}>
                  Store Battle
                </h3>
                <p style={{
                  fontSize: 12,
                  color: 'var(--text-secondary)',
                  marginBottom: 16,
                  fontWeight: 600,
                }}>
                  Store 12 vs Store 23 — Mumbai Derby
                </p>

                {/* Store 12 bar */}
                <div style={{ marginBottom: 10 }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 5,
                  }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
                      Store 12
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--gold-dark)' }}>
                      8,420 XP
                    </span>
                  </div>
                  <div style={{
                    height: 8,
                    background: 'rgba(188, 139, 87, 0.12)',
                    borderRadius: 4,
                    overflow: 'hidden',
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '72%' }}
                      transition={{ duration: 1.4, ease: [0, 0, 0.3, 1] }}
                      style={{
                        height: '100%',
                        borderRadius: 4,
                        background: 'linear-gradient(90deg, #BC8B57, #E5AD23)',
                      }}
                    />
                  </div>
                </div>

                {/* Store 23 bar */}
                <div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 5,
                  }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
                      Store 23
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>
                      6,890 XP
                    </span>
                  </div>
                  <div style={{
                    height: 8,
                    background: 'rgba(188, 139, 87, 0.12)',
                    borderRadius: 4,
                    overflow: 'hidden',
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '58%' }}
                      transition={{ duration: 1.4, delay: 0.15, ease: [0, 0, 0.3, 1] }}
                      style={{
                        height: '100%',
                        borderRadius: 4,
                        background: 'linear-gradient(90deg, var(--sand), var(--text-muted))',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab !== 'Leaderboard' && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '40vh',
              gap: 12,
            }}
          >
            <GraduationCap size={40} style={{ color: 'var(--gold-primary)', opacity: 0.4 }} />
            <p style={{
              fontSize: 15,
              fontWeight: 600,
              color: 'var(--text-muted)',
            }}>
              {activeTab} — Coming Soon
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
