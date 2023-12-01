export interface ProductInterface {
  name: string
  price: number
  tenantId: number
  currencyId: number
  companyId?: number
  stock?: number
  barCode?: string
}
