import { CurrencyEntry, CurrencyWithHistoryMetadataArray, CurrencyWithSingleHistoryMetadata, CurrencyWithValue } from '@/core/currency/currency.types'
import { DailyExchangeRate } from '@prisma/client'

interface CurrencyObj {
  [id: string]: number
}

interface ExchangeObj {
  [currencyId: number]: string
}

export const getMergedCurrenciesWithValues = (currenciesWithIdsAndMetadataButWithoutValues: CurrencyWithSingleHistoryMetadata[], currenciesWithValuesButWithoutIds: CurrencyEntry[]): CurrencyWithValue[] => {
  const currencyByIsoCodeObj: CurrencyObj = {}

  for (const currency of currenciesWithValuesButWithoutIds) {
    currencyByIsoCodeObj[currency.isoCode] = currency.valueInUsd
  }

  const currenciesWithFullData = currenciesWithIdsAndMetadataButWithoutValues.map(currency => {
    return {
      ...currency,
      valueInUsd: currencyByIsoCodeObj[currency.isoCode]
    }
  })

  return currenciesWithFullData
}

export const getMergedCurrenciesWithTargetDailyExchanges = (currencies: CurrencyWithValue[], dailyExchanges: DailyExchangeRate[]): CurrencyWithValue[] => {
  const dailyExchangeObj: ExchangeObj = {}

  for (const dailyExchange of dailyExchanges) {
    dailyExchangeObj[dailyExchange.currencyId] = dailyExchange.id
  }

  const currenciesWithDailyExchangeRateId = currencies.map(currency => {
    return {
      ...currency,
      recentExchangeRateId: dailyExchangeObj[currency.id]
    }
  })

  return currenciesWithDailyExchangeRateId
}

export const transformCurrenciesToSingleHistory = (currenciesWithHistoryMetadataArray: CurrencyWithHistoryMetadataArray[]): CurrencyWithSingleHistoryMetadata[] => {
  const currenciesWithSingleHistoryMetadata = currenciesWithHistoryMetadataArray.map(currency => {
    const { dailyExchangeRates, ...rest } = currency
    const safetyLastExchangeRate = dailyExchangeRates[0] ?? null

    return { ...rest, lastExchangeRate: safetyLastExchangeRate }
  })

  return currenciesWithSingleHistoryMetadata
}
