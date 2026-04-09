import { IndianRupee, ShoppingBag, TrendingUp, Store } from 'lucide-react'
import { kpis } from '../../../config'
import { formatCurrencyShort, formatNumber } from '../../../utils/formatCurrency'
import { getGreeting, formatFullDate } from '../../../utils/formatDate'
import StatCard from '../../ui/StatCard'
import SalesTicker from '../../ui/SalesTicker'
import SalesChart from './SalesChart'
import TopStores from './TopStores'
import AlertsPanel from './AlertsPanel'
import TopSKUs from './TopSKUs'

const { dashboard, salesTrend, topStores, topSKUs, alerts, recentTransactions } = kpis

export default function CommandCenter() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #BC8B57 0%, #D4A76A 50%, #E8C892 100%)',
        borderRadius: 16,
        padding: '28px 32px',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle decorative circle */}
        <div style={{
          position: 'absolute',
          top: -40,
          right: -20,
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: -30,
          right: 80,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{
            margin: 0,
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
          }}>
            {getGreeting()}, Ajmal HQ — Welcome to SILK
          </h1>
          <p style={{
            margin: '6px 0 0',
            fontSize: 14,
            fontWeight: 500,
            opacity: 0.85,
          }}>
            {formatFullDate()}
          </p>
        </div>
      </div>

      {/* KPI Stat Cards — 4 in a row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 20,
      }}>
        <StatCard
          label="Today's Revenue"
          value={dashboard.todayRevenue}
          formatter={formatCurrencyShort}
          trend={dashboard.weekOverWeekGrowth}
          icon={<IndianRupee size={20} />}
        />
        <StatCard
          label="Transactions"
          value={dashboard.todayTransactions}
          formatter={formatNumber}
          icon={<ShoppingBag size={20} />}
        />
        <StatCard
          label="Avg Basket"
          value={dashboard.avgBasketSize}
          formatter={(n: number) => `\u20B9${formatNumber(n)}`}
          icon={<TrendingUp size={20} />}
        />
        <StatCard
          label="Active Stores"
          value={dashboard.activeStores}
          formatter={(n: number) => `${n}/${dashboard.totalStores}`}
          icon={<Store size={20} />}
        />
      </div>

      {/* Row 2: Sales Trend + Top Stores */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 20,
      }}>
        <SalesChart data={salesTrend} />
        <TopStores data={topStores} />
      </div>

      {/* Row 3: Alerts + Top SKUs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 20,
      }}>
        <AlertsPanel alerts={alerts} />
        <TopSKUs data={topSKUs} />
      </div>

      {/* Live Sales Ticker */}
      <SalesTicker transactions={recentTransactions} />
    </div>
  )
}
