export interface ClientConfig {
  brand: string
  tagline: string
  established: number
  headquarters: string
  indiaHQ: string
  storeCount: number
  activeStores: number
  formats: string[]
  channels: string[]
  regions: string[]
  currency: string
  currencySymbol: string
  logo: string
  website: string
}

export interface ThemeConfig {
  colors: Record<string, string>
  fonts: { heading: string; body: string; display: string }
  borderRadius: { card: string; button: string; badge: string }
}

export interface Product {
  id: string
  name: string
  category: string
  price: number
  size: string
  notes: string[]
  intensity: string
  occasions: string[]
  description: string
  rating: number
  bestseller: boolean
}

export interface Store {
  id: string
  name: string
  city: string
  region: string
  type: string
  format: string
  manager: string
  staff: number
  monthlyTarget: number
  currentSales: number
  status: 'above_target' | 'near_target' | 'below_target'
}

export interface StaffMember {
  id: string
  name: string
  role: string
  store: string
  city: string
  joinDate: string
  salesPerHour: number
  conversionRate: number
  avgBasket: number
  upsellRate: number
  xp: number
  streak: number
  rank: number
  badges: string[]
  coachingNote: string
}

export interface CustomerPurchase {
  date: string
  channel: string
  store?: string
  product: string
  amount: number
}

export interface Customer {
  id: string
  name: string
  segment: string
  ltv: number
  memberSince: string
  churnRisk: 'low' | 'medium' | 'high'
  preferredNotes: string[]
  avgPurchaseCycle: number | null
  nextPurchasePredicted: string
  preferredChannel: string
  channelSplit: Record<string, number>
  purchases: CustomerPurchase[]
  actions: string[]
}

export interface Alert {
  type: string
  title: string
  message: string
  severity: 'high' | 'medium' | 'low'
}

export interface KPIData {
  dashboard: {
    todayRevenue: number
    todayTransactions: number
    avgBasketSize: number
    activeStores: number
    totalStores: number
    weekOverWeekGrowth: number
    monthTarget: number
    monthActual: number
    monthProgress: number
  }
  salesTrend: Array<{ day: string; sales: number }>
  topStores: Array<{ name: string; city: string; sales: number }>
  topSKUs: Array<{ name: string; unitsSold: number; revenue: number }>
  alerts: Alert[]
  recentTransactions: Array<{
    store: string
    city: string
    product: string
    amount: number
    minutesAgo: number
  }>
  regionBreakdown: Array<{
    region: string
    stores: number
    revenue: number
    percentage: number
  }>
}
