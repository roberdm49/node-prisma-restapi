import { CurrencyWithSingleHistoryMetadata } from '@/core/currency/currency.types'
import { ProductWithQuantity, ProductWithSingleHistoryMetadata } from '@/core/products/products.types'
import { ProductToPurchaseEntry, PurchasedItemEntry } from '@/core/purchase/purchase.types'

interface QuantityObject {
  [id: string]: number
}

export const getMergedProductsAndQuantity = (products: ProductWithSingleHistoryMetadata[], idsAndQuantity: ProductToPurchaseEntry[]): ProductWithQuantity[] => {
  const quantityObj: QuantityObject = {}
  const mergedProducts: ProductWithQuantity[] = []

  for (const idAndQuantity of idsAndQuantity) {
    const { id, quantity } = idAndQuantity
    quantityObj[id] = quantity
  }

  for (const product of products) {
    mergedProducts.push({
      ...product,
      quantity: quantityObj[product.id]
    })
  }

  return mergedProducts
}

export const createPurchasedItemsArrayFromProductsArray = (products: ProductWithQuantity[], currencies: CurrencyWithSingleHistoryMetadata[]): PurchasedItemEntry[] => {
  const purchasedItemsMap: Map<string, PurchasedItemEntry> = new Map()

  for (const product of products) {
    const key = product.name
    const existingPurchasedItem = purchasedItemsMap.get(key)

    if (existingPurchasedItem) {
      existingPurchasedItem.quantity += 1
    }

    if (!existingPurchasedItem) {
      const foundCurrency = currencies.find(currency => currency.id === product.currencyId)

      // These conditions are only for more safety
      // In fact, they are gonna be there, but since they could be null (by TS)
      // it is necessary this guard clause
      // TODO: find the way to initialize a CURRENCY with it HISTORY
      if (!foundCurrency?.lastExchangeRate || !product.latestProductHistory) {
        throw new Error('Internal server error - system under corrections')
      }

      const purchasedItem: PurchasedItemEntry = {
        quantity: 1,
        dailyExchangeRateId: foundCurrency.lastExchangeRate.id,
        productHistoryId: product.latestProductHistory.id
      }

      purchasedItemsMap.set(key, purchasedItem)
    }
  }

  const purchasedItemsEntries: PurchasedItemEntry[] = Array.from(purchasedItemsMap.values())

  return purchasedItemsEntries
}
