import type { ClientConfig, ThemeConfig, Product, Store, StaffMember, Customer, KPIData } from './types'

import clientData from './clients/ajmal/client.json'
import themeData from './clients/ajmal/theme.json'
import productsData from './clients/ajmal/products.json'
import storesData from './clients/ajmal/stores.json'
import staffData from './clients/ajmal/staff.json'
import customersData from './clients/ajmal/customers.json'
import kpisData from './clients/ajmal/kpis.json'

export const client: ClientConfig = clientData as ClientConfig
export const theme: ThemeConfig = themeData as ThemeConfig
export const products: Product[] = productsData as Product[]
export const stores: Store[] = storesData as Store[]
export const staff: StaffMember[] = staffData as StaffMember[]
export const customers: Customer[] = customersData as Customer[]
export const kpis: KPIData = kpisData as KPIData
