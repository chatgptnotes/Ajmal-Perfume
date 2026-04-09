import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { products } from '../../../config'
import type { Product } from '../../../config/types'
import StepPreferences from './StepPreferences'
import StepProcessing from './StepProcessing'
import StepRecommendations from './StepRecommendations'

interface Recommendation {
  readonly product: Product
  readonly matchScore: number
}

type BudgetRange = 'Under \u20B91,000' | '\u20B91,000\u20133,000' | '\u20B93,000+'

const MATCH_SCORES = [95, 92, 87, 82] as const

const STEPS = [
  { number: 1, label: 'Preferences' },
  { number: 2, label: 'AI Matching' },
  { number: 3, label: 'Recommendations' },
] as const

function parseBudgetRange(budget: string): { min: number; max: number } {
  const ranges: Record<BudgetRange, { min: number; max: number }> = {
    'Under \u20B91,000': { min: 0, max: 999 },
    '\u20B91,000\u20133,000': { min: 1000, max: 3000 },
    '\u20B93,000+': { min: 3000, max: Infinity },
  }
  return ranges[budget as BudgetRange] ?? { min: 0, max: Infinity }
}

function scoreProduct(
  product: Product,
  occasion: string,
  intensity: string,
  budget: string,
  notes: readonly string[],
): number {
  let score = 0

  // Occasion match
  if (occasion !== '' && product.occasions.includes(occasion)) {
    score += 30
  }

  // Intensity match
  if (intensity !== '' && product.intensity === intensity) {
    score += 25
  }

  // Budget match
  if (budget !== '') {
    const { min, max } = parseBudgetRange(budget)
    if (product.price >= min && product.price <= max) {
      score += 25
    }
  }

  // Notes overlap
  if (notes.length > 0) {
    const overlap = product.notes.filter((n) =>
      notes.some((selected) => n.toLowerCase().includes(selected.toLowerCase()) ||
        selected.toLowerCase().includes(n.toLowerCase()))
    ).length
    score += Math.min(20, overlap * 7)
  }

  // Bestseller bonus
  if (product.bestseller) {
    score += 5
  }

  // Rating bonus
  score += product.rating

  return score
}

function computeRecommendations(
  occasion: string,
  intensity: string,
  budget: string,
  notes: readonly string[],
): Recommendation[] {
  const scored = products.map((product) => ({
    product,
    rawScore: scoreProduct(product, occasion, intensity, budget, notes),
  }))

  scored.sort((a, b) => b.rawScore - a.rawScore)

  return scored.slice(0, 4).map((item, index) => ({
    product: item.product,
    matchScore: MATCH_SCORES[index] ?? 80,
  }))
}

function ProgressBar({ currentStep }: { readonly currentStep: number }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 0,
      marginBottom: 32,
    }}>
      {STEPS.map((step, i) => (
        <div
          key={step.number}
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Step circle + label */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            minWidth: 100,
          }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 700,
              transition: 'all 0.3s ease',
              background: currentStep >= step.number
                ? 'var(--gold-primary)'
                : 'var(--beige-section)',
              color: currentStep >= step.number
                ? '#fff'
                : 'var(--text-muted)',
              border: currentStep >= step.number
                ? '2px solid var(--gold-primary)'
                : '2px solid var(--border)',
              boxShadow: currentStep === step.number
                ? '0 0 0 4px rgba(188,139,87,0.2)'
                : 'none',
            }}>
              {currentStep > step.number ? '\u2713' : step.number}
            </div>
            <span style={{
              fontSize: 12,
              fontWeight: currentStep === step.number ? 700 : 500,
              color: currentStep >= step.number
                ? 'var(--gold-dark)'
                : 'var(--text-muted)',
              letterSpacing: '-0.01em',
            }}>
              {step.label}
            </span>
          </div>

          {/* Connector line between steps */}
          {i < STEPS.length - 1 && (
            <div style={{
              width: 80,
              height: 3,
              borderRadius: 2,
              background: currentStep > step.number
                ? 'var(--gold-primary)'
                : 'var(--sand)',
              transition: 'background 0.3s ease',
              marginBottom: 22,
            }} />
          )}
        </div>
      ))}
    </div>
  )
}

export default function FragranceAdvisor() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedOccasion, setSelectedOccasion] = useState('')
  const [selectedIntensity, setSelectedIntensity] = useState('')
  const [selectedBudget, setSelectedBudget] = useState('')
  const [selectedNotes, setSelectedNotes] = useState<readonly string[]>([])
  const [recommendations, setRecommendations] = useState<readonly Recommendation[]>([])

  const handleNotesToggle = useCallback((note: string) => {
    setSelectedNotes((prev) =>
      prev.includes(note)
        ? prev.filter((n) => n !== note)
        : [...prev, note]
    )
  }, [])

  const handleSubmit = useCallback(() => {
    setCurrentStep(2)
  }, [])

  const handleProcessingComplete = useCallback(() => {
    const results = computeRecommendations(
      selectedOccasion,
      selectedIntensity,
      selectedBudget,
      selectedNotes,
    )
    setRecommendations(results)
    setCurrentStep(3)
  }, [selectedOccasion, selectedIntensity, selectedBudget, selectedNotes])

  const handleReset = useCallback(() => {
    setCurrentStep(1)
    setSelectedOccasion('')
    setSelectedIntensity('')
    setSelectedBudget('')
    setSelectedNotes([])
    setRecommendations([])
  }, [])

  return (
    <div style={{
      padding: '24px 32px',
      maxWidth: 1100,
      margin: '0 auto',
    }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <h1 style={{
          fontSize: 28,
          fontWeight: 800,
          color: 'var(--gold-dark)',
          letterSpacing: '-0.03em',
        }}>
          AI Fragrance Advisor
        </h1>
        <p style={{
          fontSize: 14,
          color: 'var(--text-secondary)',
          marginTop: 4,
        }}>
          Turn Every Staff Into an Expert
        </p>
      </div>

      {/* Progress Bar */}
      <ProgressBar currentStep={currentStep} />

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <StepPreferences
            key="preferences"
            selectedOccasion={selectedOccasion}
            selectedIntensity={selectedIntensity}
            selectedBudget={selectedBudget}
            selectedNotes={selectedNotes}
            onOccasionChange={setSelectedOccasion}
            onIntensityChange={setSelectedIntensity}
            onBudgetChange={setSelectedBudget}
            onNotesToggle={handleNotesToggle}
            onSubmit={handleSubmit}
          />
        )}

        {currentStep === 2 && (
          <StepProcessing
            key="processing"
            onComplete={handleProcessingComplete}
          />
        )}

        {currentStep === 3 && (
          <StepRecommendations
            key="recommendations"
            recommendations={recommendations}
            onReset={handleReset}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
