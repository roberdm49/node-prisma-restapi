import { Currency } from '@/core/currency/currency.types'
import { Product, ProductWithQuantity } from '@/core/products/products.types'
import { ProductToPurchaseEntry, PurchasedItemEntry } from '@/core/purchase/purchase.types'

interface QuantityObject {
  [id: string]: number
}

export const getMergedProductsAndQuantity = (products: Product[], idsAndQuantity: ProductToPurchaseEntry[]): ProductWithQuantity[] => {
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

export const createPurchasedItemsArrayFromProductsArray = (products: ProductWithQuantity[], currencies: Currency[]): PurchasedItemEntry[] => {
  const purchasedItemsMap: Map<string, PurchasedItemEntry> = new Map()

  for (const product of products) {
    const key = product.name
    const existingPurchasedItem = purchasedItemsMap.get(key)

    if (existingPurchasedItem) {
      existingPurchasedItem.quantity += 1
    }

    if (!existingPurchasedItem) {
      const foundCurrency = currencies.find(currency => currency.id === product.currencyId)

      // TODO: check this, too many conditional for non-null fields
      if (!foundCurrency?.recentExchangeRateId) {
        throw new Error('Internal server error - system under corrections')
      }

      // TODO: check this, too many conditional for non-null fields
      if (!product.latestProductHistoryId) {
        throw new Error('Internal server error - system under corrections')
      }

      const purchasedItem: PurchasedItemEntry = {
        quantity: 1,
        dailyExchangeRateId: foundCurrency.recentExchangeRateId,
        productHistoryId: product.latestProductHistoryId
      }

      purchasedItemsMap.set(key, purchasedItem)
    }
  }

  const purchasedItemsEntries: PurchasedItemEntry[] = Array.from(purchasedItemsMap.values())

  return purchasedItemsEntries
}
