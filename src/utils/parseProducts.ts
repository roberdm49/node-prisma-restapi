import { ProductEntryWithNull, ProductEntryWithUndefined } from '@/core/products/products.types'

export const parseProductsEntryFromUndefinedToNull = (products: ProductEntryWithUndefined[]): ProductEntryWithNull[] => {
  const parsedProducts: ProductEntryWithNull[] = []

  for (const product of products) {
    const { name, description, barCode, stock, price, currencyId, companyId } = product

    parsedProducts.push({
      name,
      price,
      currencyId,
      description: description ?? null,
      barCode: barCode ?? null,
      stock: stock ?? null,
      companyId: companyId ?? null
    })
  }

  return parsedProducts
}
