import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

interface StepPreferencesProps {
  readonly selectedOccasion: string
  readonly selectedIntensity: string
  readonly selectedBudget: string
  readonly selectedNotes: readonly string[]
  readonly onOccasionChange: (value: string) => void
  readonly onIntensityChange: (value: string) => void
  readonly onBudgetChange: (value: string) => void
  readonly onNotesToggle: (value: string) => void
  readonly onSubmit: () => void
}

const OCCASIONS = ['Gift', 'Personal', 'Wedding', 'Eid Special', 'Date Night']
const INTENSITIES = ['Light & Fresh', 'Medium & Balanced', 'Bold & Lasting']
const BUDGETS = ['Under \u20B91,000', '\u20B91,000\u20133,000', '\u20B93,000+']
const NOTE_OPTIONS = ['Floral', 'Woody', 'Oud', 'Musky', 'Fresh', 'Citrus', 'Amber']

const pillBase: React.CSSProperties = {
  padding: '8px 18px',
  borderRadius: 50,
  fontSize: 13,
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  border: '1px solid var(--border)',
  background: 'var(--beige-section)',
  color: 'var(--text-secondary)',
  outline: 'none',
}

const pillActive: React.CSSProperties = {
  ...pillBase,
  background: 'rgba(188,139,87,0.15)',
  border: '2px solid var(--gold-primary)',
  color: 'var(--gold-dark)',
  fontWeight: 600,
}

const sectionCard: React.CSSProperties = {
  background: 'var(--beige-section)',
  borderRadius: 12,
  padding: '20px 24px',
}

const sectionLabel: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'var(--gold-dark)',
  marginBottom: 12,
}

function PerfumeBottleSVG() {
  return (
    <svg width="160" height="240" viewBox="0 0 160 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cap */}
      <rect x="60" y="8" width="40" height="20" rx="4" fill="var(--gold-dark)" />
      <rect x="66" y="0" width="28" height="12" rx="3" fill="var(--gold-primary)" />
      {/* Neck */}
      <rect x="68" y="28" width="24" height="24" rx="2" fill="var(--gold-primary)" opacity="0.8" />
      {/* Body */}
      <rect x="32" y="52" width="96" height="160" rx="12" fill="url(#bottleGrad)" />
      <rect x="32" y="52" width="96" height="160" rx="12" stroke="var(--gold-primary)" strokeWidth="1.5" fill="none" />
      {/* Label area */}
      <rect x="46" y="90" width="68" height="80" rx="6" fill="rgba(255,255,255,0.15)" />
      <text x="80" y="122" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--gold-dark)" letterSpacing="0.06em">AJMAL</text>
      <text x="80" y="140" textAnchor="middle" fontSize="7" fill="var(--gold-dark)" opacity="0.7" letterSpacing="0.04em">PERFUMES</text>
      {/* Shine */}
      <rect x="42" y="60" width="8" height="100" rx="4" fill="rgba(255,255,255,0.2)" />
      {/* Base */}
      <rect x="38" y="208" width="84" height="8" rx="4" fill="var(--gold-dark)" opacity="0.3" />
      <defs>
        <linearGradient id="bottleGrad" x1="32" y1="52" x2="128" y2="212" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4A96A" />
          <stop offset="50%" stopColor="#BC8B57" />
          <stop offset="100%" stopColor="#8B6B3D" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function StepPreferences({
  selectedOccasion,
  selectedIntensity,
  selectedBudget,
  selectedNotes,
  onOccasionChange,
  onIntensityChange,
  onBudgetChange,
  onNotesToggle,
  onSubmit,
}: StepPreferencesProps) {
  const canSubmit = selectedOccasion !== '' || selectedIntensity !== '' ||
    selectedBudget !== '' || selectedNotes.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4, ease: [0, 0, 0.3, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 40,
        alignItems: 'start',
      }}
    >
      {/* Left: Selection Groups */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Occasion */}
        <div style={sectionCard}>
          <p style={sectionLabel}>Occasion</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {OCCASIONS.map((occ) => (
              <button
                key={occ}
                style={selectedOccasion === occ ? pillActive : pillBase}
                onClick={() => onOccasionChange(occ)}
              >
                {occ}
              </button>
            ))}
          </div>
        </div>

        {/* Intensity */}
        <div style={sectionCard}>
          <p style={sectionLabel}>Intensity</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {INTENSITIES.map((int) => {
              const isActive = selectedIntensity === int
              return (
                <button
                  key={int}
                  style={{
                    ...(isActive ? pillActive : pillBase),
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                  onClick={() => onIntensityChange(int)}
                >
                  <span style={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    border: isActive
                      ? '5px solid var(--gold-primary)'
                      : '2px solid var(--border)',
                    background: isActive ? '#fff' : 'transparent',
                    flexShrink: 0,
                  }} />
                  {int}
                </button>
              )
            })}
          </div>
        </div>

        {/* Budget */}
        <div style={sectionCard}>
          <p style={sectionLabel}>Budget</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {BUDGETS.map((b) => (
              <button
                key={b}
                style={selectedBudget === b ? pillActive : pillBase}
                onClick={() => onBudgetChange(b)}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Preferred Notes */}
        <div style={sectionCard}>
          <p style={sectionLabel}>Preferred Notes</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {NOTE_OPTIONS.map((note) => {
              const isSelected = selectedNotes.includes(note)
              return (
                <button
                  key={note}
                  style={isSelected ? pillActive : pillBase}
                  onClick={() => onNotesToggle(note)}
                >
                  {note}
                </button>
              )
            })}
          </div>
        </div>

        {/* Submit CTA */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onSubmit}
          disabled={!canSubmit}
          style={{
            background: canSubmit ? 'var(--gold-primary)' : 'var(--sand)',
            color: canSubmit ? '#fff' : 'var(--text-muted)',
            border: 'none',
            borderRadius: 50,
            padding: '16px 40px',
            fontSize: 16,
            fontWeight: 700,
            cursor: canSubmit ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            alignSelf: 'flex-start',
            boxShadow: canSubmit ? 'var(--shadow-gold)' : 'none',
            transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
          }}
        >
          <Sparkles size={18} />
          Find Perfect Fragrance
          <span style={{ marginLeft: 4 }}>&rarr;</span>
        </motion.button>
      </div>

      {/* Right: Decorative Perfume Bottle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0, 0, 0.3, 1] }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 200,
          paddingTop: 20,
        }}
      >
        <div style={{
          position: 'relative',
          filter: 'drop-shadow(0 20px 40px rgba(188,139,87,0.25))',
        }}>
          <PerfumeBottleSVG />
          {/* Decorative sparkles */}
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: 20,
              right: -10,
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--gold-bright)',
            }}
          />
          <motion.div
            animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.9, 1.2, 0.9] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            style={{
              position: 'absolute',
              bottom: 40,
              left: -8,
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--gold-primary)',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
