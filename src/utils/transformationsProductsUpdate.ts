import { ProductUpdate } from '@/core/products/products.types'
import { Product } from '@prisma/client'

export const mergeProductsAndProductsToUpdate = (dbProducts: Product[], productsToUpdate: ProductUpdate[]): Product[] => {
  const mapProductsToUpdate: Map<String, ProductUpdate> = new Map()

  for (const product of productsToUpdate) {
    mapProductsToUpdate.set(product.id, product)
  }

  const mergedProducts: Product[] = []

  for (const product of dbProducts) {
    const targetProductToUpdate = mapProductsToUpdate.get(product.id)

    if (!targetProductToUpdate) {
      throw new Error('Petición malformada')
    }

    const { id, ...rest } = targetProductToUpdate

    if (Object.prototype.hasOwnProperty.call(rest, id)) {
      throw new Error('Petición malformada')
    }

    mergedProducts.push({
      id: product.id,
      name: rest.name ?? product.name,
      price: rest.price ?? product.price,
      tenantId: product.tenantId,
      currencyId: rest.currencyId ?? product.currencyId,
      description: rest.description ?? product.description,
      stock: rest.stock ?? product.stock,
      barCode: rest.barCode ?? product.barCode,
      companyId: rest.companyId ?? product.companyId,
      latestProductHistoryId: product.latestProductHistoryId
    })
  }

  return mergedProducts
}
