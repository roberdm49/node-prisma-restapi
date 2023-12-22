import { IPurchase } from './purchase.interfaces'

export type TPurchaseModelGetAll = () => Promise<IPurchase[]>

export type TPurchaseServiceGetAll = () => Promise<IPurchase[]>
