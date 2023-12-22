import { Router } from 'express'
import { IPurchase, IPurchaseModel } from './purchase.interfaces'

export type TPurchaseModelGetAll = () => Promise<IPurchase[]>

export type TPurchaseServiceGetAll = () => Promise<IPurchase[]>

export type TPurchaseCreateRoutes = ({ purchaseModel }: { purchaseModel: IPurchaseModel }) => Router
