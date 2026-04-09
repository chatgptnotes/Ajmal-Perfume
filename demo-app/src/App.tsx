import { Routes, Route } from 'react-router-dom'
import AppShell from './layout/AppShell'
import CommandCenter from './components/modules/command-center/CommandCenter'
import SmartPOS from './components/modules/pos/SmartPOS'
import DemandForecast from './components/modules/forecast/DemandForecast'
import InventoryIntel from './components/modules/inventory/InventoryIntel'
import StaffPerformance from './components/modules/staff/StaffPerformance'
import CustomerAnalytics from './components/modules/customers/CustomerAnalytics'
import FragranceAdvisor from './components/modules/fragrance-advisor/FragranceAdvisor'
import Academy from './components/modules/academy/Academy'
import WhatsAppCRM from './components/modules/whatsapp/WhatsAppCRM'
import DynamicPricing from './components/modules/pricing/DynamicPricing'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<CommandCenter />} />
        <Route path="/pos" element={<SmartPOS />} />
        <Route path="/forecast" element={<DemandForecast />} />
        <Route path="/inventory" element={<InventoryIntel />} />
        <Route path="/staff" element={<StaffPerformance />} />
        <Route path="/customers" element={<CustomerAnalytics />} />
        <Route path="/fragrance-advisor" element={<FragranceAdvisor />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/whatsapp" element={<WhatsAppCRM />} />
        <Route path="/pricing" element={<DynamicPricing />} />
      </Route>
    </Routes>
  )
}
