import { useState, useEffect } from 'react'

/**
 * Animates a number from 0 to target over a duration.
 */
export function useAnimatedCounter(target: number, duration: number = 1500): number {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const startValue = 0

    function update() {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic for luxury feel
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(startValue + (target - startValue) * eased))

      if (progress < 1) {
        requestAnimationFrame(update)
      }
    }

    requestAnimationFrame(update)
  }, [target, duration])

  return count
}
