import { motion } from 'framer-motion'
import { RotateCcw, ShoppingBag } from 'lucide-react'
import type { Product } from '../../../config/types'
import ProductCard from './ProductCard'

interface Recommendation {
  readonly product: Product
  readonly matchScore: number
}

interface StepRecommendationsProps {
  readonly recommendations: readonly Recommendation[]
  readonly onReset: () => void
}

export default function StepRecommendations({ recommendations, onReset }: StepRecommendationsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4, ease: [0, 0, 0.3, 1] }}
      style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <div>
          <h3 style={{
            fontSize: 20,
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}>
            <ShoppingBag size={20} style={{ marginRight: 8, verticalAlign: 'middle', color: 'var(--gold-primary)' }} />
            Top Matches for Your Customer
          </h3>
          <p style={{
            fontSize: 13,
            color: 'var(--text-secondary)',
            marginTop: 4,
          }}>
            AI-ranked by preference alignment. Use the talking points during consultation.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onReset}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'none',
            border: '2px solid var(--gold-primary)',
            color: 'var(--gold-dark)',
            borderRadius: 50,
            padding: '10px 24px',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <RotateCcw size={14} />
          New Search
        </motion.button>
      </div>

      {/* Product Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 20,
      }}>
        {recommendations.map((rec, index) => (
          <ProductCard
            key={rec.product.id}
            product={rec.product}
            matchScore={rec.matchScore}
            index={index}
          />
        ))}
      </div>

      {/* Bottom Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        style={{
          background: 'rgba(188,139,87,0.08)',
          border: '1px solid rgba(188,139,87,0.2)',
          borderRadius: 12,
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
        }}
      >
        <span style={{
          fontSize: 20,
          lineHeight: 1,
          flexShrink: 0,
        }}>
          *
        </span>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold-dark)' }}>
            AI Upsell Insight
          </p>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.5 }}>
            Customers who selected these preferences also purchased complementary Bakhoor
            and body mists. Consider bundling for a 15-20% higher basket value.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
