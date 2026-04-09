/**
 * "Good Morning/Afternoon/Evening" based on current time.
 */
export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  return 'Good Evening'
}

/**
 * Format as readable date: "Tuesday, 8 April 2026"
 */
export function formatFullDate(date: Date = new Date()): string {
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * "2 min ago", "1 hr ago", etc.
 */
export function formatTimeAgo(minutesAgo: number): string {
  if (minutesAgo < 1) return 'Just now'
  if (minutesAgo < 60) return `${minutesAgo} min ago`
  const hours = Math.floor(minutesAgo / 60)
  return `${hours} hr${hours > 1 ? 's' : ''} ago`
}
