/**
 * Format number as Indian currency (lakhs/crores system).
 * 47,30,000 → "₹47.3L"
 * 1,18,50,000 → "₹1.19Cr"
 */
export function formatCurrencyShort(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)}Cr`
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`
  }
  return `₹${amount}`
}

/**
 * Format as full Indian number system with commas.
 * 4730000 → "₹47,30,000"
 */
export function formatCurrencyFull(amount: number): string {
  const str = Math.round(amount).toString()
  let result = ''
  const len = str.length

  if (len <= 3) return `₹${str}`

  result = str.slice(-3)
  let remaining = str.slice(0, -3)

  while (remaining.length > 2) {
    result = remaining.slice(-2) + ',' + result
    remaining = remaining.slice(0, -2)
  }

  if (remaining.length > 0) {
    result = remaining + ',' + result
  }

  return `₹${result}`
}

/**
 * Format number with commas (no currency symbol).
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-IN')
}
