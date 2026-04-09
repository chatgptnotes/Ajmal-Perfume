import { motion } from 'framer-motion'
import { useEffect } from 'react'

interface StepProcessingProps {
  readonly onComplete: () => void
}

const PROCESSING_STEPS = [
  'Analyzing fragrance knowledge graph...',
  'Matching preference vectors...',
  'Ranking by occasion fit & intensity...',
  'Generating staff talking points...',
]

function PulsingDot({ delay }: { readonly delay: number }) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.4, 1, 0.4],
      }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      style={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        background: 'var(--gold-primary)',
      }}
    />
  )
}

export default function StepProcessing({ onComplete }: StepProcessingProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2400)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 400,
        gap: 32,
      }}
    >
      {/* Pulsing Dots */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <PulsingDot delay={0} />
        <PulsingDot delay={0.2} />
        <PulsingDot delay={0.4} />
      </div>

      {/* Rotating Processing Text */}
      <div style={{ textAlign: 'center', minHeight: 60 }}>
        {PROCESSING_STEPS.map((step, i) => (
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.55, duration: 0.35 }}
            style={{
              fontSize: 14,
              color: 'var(--text-secondary)',
              lineHeight: 2,
            }}
          >
            {step}
          </motion.p>
        ))}
      </div>

      {/* Animated Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          border: '3px solid var(--sand)',
          borderTopColor: 'var(--gold-primary)',
        }}
      />

      {/* AI Brand Text */}
      <p style={{
        fontSize: 12,
        fontWeight: 600,
        color: 'var(--gold-dark)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }}>
        Powered by Bettroi AI Engine
      </p>
    </motion.div>
  )
}
