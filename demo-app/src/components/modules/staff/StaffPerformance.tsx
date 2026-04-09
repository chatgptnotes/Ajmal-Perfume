import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, ChevronDown } from 'lucide-react'
import { staff } from '../../../config'
import Scorecard from './Scorecard'
import CoachingCard from './CoachingCard'

export default function StaffPerformance() {
  const [selectedId, setSelectedId] = useState(staff[0].id)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const selectedMember = staff.find((m) => m.id === selectedId) ?? staff[0]

  const stores = [...new Set(staff.map((m) => m.store))]
  const [storeFilter, setStoreFilter] = useState<string>('All Stores')

  const filteredStaff = storeFilter === 'All Stores'
    ? staff
    : staff.filter((m) => m.store === storeFilter)

  return (
    <div style={{ padding: '0 0 40px' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 28,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
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
            <Users size={22} color="#fff" />
          </div>
          <div>
            <h1 style={{
              fontSize: 26,
              fontWeight: 800,
              color: 'var(--gold-dark)',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
            }}>
              Staff Performance
            </h1>
            <p style={{
              fontSize: 13,
              color: 'var(--text-secondary)',
              fontWeight: 500,
            }}>
              Individual scorecards & AI coaching
            </p>
          </div>
        </div>

        {/* Store Filter Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              borderRadius: 10,
              border: '1.5px solid var(--sand)',
              background: '#fff',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
              minWidth: 180,
              justifyContent: 'space-between',
            }}
          >
            <span>{storeFilter}</span>
            <ChevronDown
              size={16}
              style={{
                color: 'var(--text-muted)',
                transition: 'transform 0.2s',
                transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: 6,
                  background: '#fff',
                  borderRadius: 10,
                  border: '1px solid var(--sand)',
                  boxShadow: 'var(--shadow-card)',
                  zIndex: 50,
                  minWidth: 220,
                  maxHeight: 280,
                  overflowY: 'auto',
                }}
              >
                <button
                  onClick={() => { setStoreFilter('All Stores'); setDropdownOpen(false) }}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '10px 16px',
                    fontSize: 12,
                    fontWeight: storeFilter === 'All Stores' ? 700 : 500,
                    color: storeFilter === 'All Stores' ? 'var(--gold-dark)' : 'var(--text-primary)',
                    background: storeFilter === 'All Stores' ? 'rgba(188, 139, 87, 0.06)' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  All Stores
                </button>
                {stores.map((store) => (
                  <button
                    key={store}
                    onClick={() => { setStoreFilter(store); setDropdownOpen(false) }}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '10px 16px',
                      fontSize: 12,
                      fontWeight: storeFilter === store ? 700 : 500,
                      color: storeFilter === store ? 'var(--gold-dark)' : 'var(--text-primary)',
                      background: storeFilter === store ? 'rgba(188, 139, 87, 0.06)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    {store}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Staff Selector Pills */}
      <div style={{
        display: 'flex',
        gap: 8,
        marginBottom: 24,
        overflowX: 'auto',
        paddingBottom: 4,
      }}>
        {filteredStaff
          .sort((a, b) => a.rank - b.rank)
          .map((member) => (
            <button
              key={member.id}
              onClick={() => setSelectedId(member.id)}
              style={{
                padding: '8px 16px',
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 700,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.25s var(--ease-luxury)',
                border: selectedId === member.id
                  ? 'none'
                  : '1.5px solid var(--sand)',
                background: selectedId === member.id
                  ? 'linear-gradient(90deg, #BC8B57, #E5AD23)'
                  : '#fff',
                color: selectedId === member.id
                  ? '#fff'
                  : 'var(--text-secondary)',
                boxShadow: selectedId === member.id
                  ? 'var(--shadow-gold)'
                  : 'none',
              }}
            >
              {member.name}
            </button>
          ))}
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedMember.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1.25fr 1fr',
            gap: 28,
            alignItems: 'start',
          }}
        >
          {/* Left: Scorecard */}
          <Scorecard member={selectedMember} />

          {/* Right: AI Coaching */}
          <CoachingCard member={selectedMember} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
