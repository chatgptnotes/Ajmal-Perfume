import { motion } from 'framer-motion'
import { Heart, Star } from 'lucide-react'
import { useState } from 'react'
import type { Product } from '../../../config/types'
import { formatCurrencyFull } from '../../../utils/formatCurrency'

interface ProductCardProps {
  readonly product: Product
  readonly matchScore: number
  readonly index: number
}

function renderStars(rating: number): React.ReactNode[] {
  const stars: React.ReactNode[] = []
  const fullStars = Math.floor(rating)
  const hasHalf = rating - fullStars >= 0.5

  for (let i = 0; i < 5; i++) {
    const isFilled = i < fullStars
    const isHalf = i === fullStars && hasHalf
    stars.push(
      <Star
        key={i}
        size={14}
        fill={isFilled || isHalf ? 'var(--gold-primary)' : 'none'}
        stroke={isFilled || isHalf ? 'var(--gold-primary)' : 'var(--border)'}
        strokeWidth={1.5}
      />
    )
  }
  return stars
}

function generateTalkingPoints(product: Product): string[] {
  const points: string[] = []

  if (product.bestseller) {
    points.push('Top seller this season')
  }

  if (product.notes.includes('Oud')) {
    points.push('Authentic Arabian oud sourced from Assam')
  }

  if (product.intensity === 'Bold & Lasting') {
    points.push('Long-lasting 8+ hour projection')
  } else if (product.intensity === 'Light & Fresh') {
    points.push('Perfect for daytime wear')
  } else {
    points.push('Versatile day-to-night transition')
  }

  if (product.occasions.includes('Gift')) {
    points.push('Popular gifting choice')
  }

  return points.slice(0, 3)
}

export default function ProductCard({ product, matchScore, index }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false)
  const talkingPoints = generateTalkingPoints(product)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.5, ease: [0, 0, 0.3, 1] }}
      style={{
        background: 'var(--beige-section)',
        borderRadius: 12,
        padding: 24,
        boxShadow: 'var(--shadow-card)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        minWidth: 0,
      }}
    >
      {/* Match Score Badge */}
      <div style={{
        position: 'absolute',
        top: 12,
        right: 12,
        background: 'var(--gold-primary)',
        color: '#fff',
        fontWeight: 700,
        fontSize: 13,
        padding: '4px 12px',
        borderRadius: 50,
        letterSpacing: '-0.01em',
      }}>
        {matchScore}% Match
      </div>

      {/* Wishlist Heart */}
      <button
        onClick={() => setWishlisted(!wishlisted)}
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 4,
        }}
      >
        <Heart
          size={20}
          fill={wishlisted ? 'var(--error)' : 'none'}
          stroke={wishlisted ? 'var(--error)' : 'var(--text-secondary)'}
          strokeWidth={1.5}
        />
      </button>

      {/* Product Image Placeholder */}
      <div style={{
        width: '100%',
        height: 120,
        background: 'linear-gradient(135deg, var(--sand) 0%, var(--light-beige) 100%)',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
      }}>
        <div style={{
          width: 40,
          height: 72,
          borderRadius: '4px 4px 2px 2px',
          background: 'linear-gradient(180deg, var(--gold-primary) 0%, var(--gold-dark) 100%)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            top: -6,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 12,
            height: 10,
            background: 'var(--gold-dark)',
            borderRadius: '2px 2px 0 0',
          }} />
        </div>
      </div>

      {/* Category + Bestseller */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
        <span style={{
          fontSize: 11,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'var(--text-secondary)',
        }}>
          {product.category}
        </span>
        {product.bestseller && (
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: 'var(--gold-primary)',
            background: 'rgba(188,139,87,0.12)',
            padding: '2px 8px',
            borderRadius: 50,
          }}>
            Bestseller
          </span>
        )}
      </div>

      {/* Name & Price */}
      <div>
        <h3 style={{
          fontSize: 17,
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
          lineHeight: 1.3,
        }}>
          {product.name}
        </h3>
        <p style={{
          fontSize: 16,
          fontWeight: 700,
          color: 'var(--gold-dark)',
          marginTop: 2,
        }}>
          {formatCurrencyFull(product.price)}
          <span style={{ fontSize: 12, fontWeight: 400, color: 'var(--text-secondary)', marginLeft: 4 }}>
            / {product.size}
          </span>
        </p>
      </div>

      {/* Description */}
      <p style={{
        fontSize: 13,
        color: 'var(--text-secondary)',
        lineHeight: 1.5,
      }}>
        {product.description}
      </p>

      {/* Rating */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ display: 'flex', gap: 2 }}>
          {renderStars(product.rating)}
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
          {product.rating}
        </span>
      </div>

      {/* Notes Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {product.notes.map((note) => (
          <span
            key={note}
            style={{
              fontSize: 11,
              padding: '3px 10px',
              borderRadius: 50,
              background: 'rgba(188,139,87,0.10)',
              color: 'var(--gold-dark)',
              fontWeight: 500,
            }}
          >
            {note}
          </span>
        ))}
      </div>

      {/* AI Talking Points */}
      <div style={{
        marginTop: 4,
        padding: '10px 12px',
        background: 'rgba(188,139,87,0.06)',
        borderRadius: 8,
        borderLeft: '3px solid var(--gold-primary)',
      }}>
        <p style={{
          fontSize: 11,
          fontWeight: 700,
          color: 'var(--gold-dark)',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          marginBottom: 6,
        }}>
          Staff Talking Points
        </p>
        <ul style={{ margin: 0, paddingLeft: 16 }}>
          {talkingPoints.map((point) => (
            <li key={point} style={{
              fontSize: 12,
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
