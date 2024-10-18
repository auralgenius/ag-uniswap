import { meldSupportedCurrencyToCurrencyInfo } from 'graphql/data/types'
import { useActiveLocalCurrency } from 'hooks/useActiveLocalCurrency'
import { useActiveLocale } from 'hooks/useActiveLocale'
import { useMemo } from 'react'
import { getFiatCurrencyName } from 'uniswap/src/features/fiatCurrency/hooks'
import {
  useFiatOnRampAggregatorSupportedFiatCurrenciesQuery,
  useFiatOnRampAggregatorSupportedTokensQuery,
} from 'uniswap/src/features/fiatOnRamp/api'
import { FORCountry, FiatCurrencyInfo, FiatOnRampCurrency } from 'uniswap/src/features/fiatOnRamp/types'
import { useTranslation } from 'uniswap/src/i18n'
// eslint-disable-next-line no-restricted-imports
import { getFiatCurrencyComponents } from 'utilities/src/format/localeBased'

type FiatOnRampCurrencyInfo = {
  meldSupportedFiatCurrency: FiatCurrencyInfo
  notAvailableInThisRegion: boolean
}

export const fallbackCurrencyInfo: FiatCurrencyInfo = {
  ...getFiatCurrencyComponents('en-US', 'USD'),
  symbol: '$',
  name: 'United States Dollar',
  shortName: 'USD',
  code: 'USD',
}

/**
 * Returns the meld-supported fiat currency info based on user-selected country,
 * the local currency active in the user's app settings, with a fallback to USD.
 */
export function useMeldFiatCurrencyInfo(selectedCountry?: FORCountry): FiatOnRampCurrencyInfo {
  const { data: supportedFiatCurrencies } = useFiatOnRampAggregatorSupportedFiatCurrenciesQuery({
    countryCode: selectedCountry?.countryCode ?? 'US',
  })

  const activeLocale = useActiveLocale()
  const activeLocalCurrency = useActiveLocalCurrency()
  const { t } = useTranslation()

  const appFiatCurrencySupported =
    supportedFiatCurrencies &&
    supportedFiatCurrencies.fiatCurrencies.some(
      (currency): boolean => activeLocalCurrency.toLowerCase() === currency.fiatCurrencyCode.toLowerCase(),
    )
  const meldSupportedFiatCurrency: FiatCurrencyInfo = useMemo(() => {
    const activeLocalCurrencyComponents = getFiatCurrencyComponents(activeLocale, activeLocalCurrency)
    const { name, shortName } = getFiatCurrencyName(t, activeLocalCurrency)
    const activeLocalCurrencyFiatCurrencyInfo: FiatCurrencyInfo = {
      ...activeLocalCurrencyComponents,
      name,
      shortName,
      code: activeLocalCurrency,
    }
    return appFiatCurrencySupported ? activeLocalCurrencyFiatCurrencyInfo : fallbackCurrencyInfo
  }, [activeLocalCurrency, activeLocale, appFiatCurrencySupported, t])

  return {
    meldSupportedFiatCurrency,
    notAvailableInThisRegion: supportedFiatCurrencies?.fiatCurrencies?.length === 0,
  }
}

export function useFiatOnRampSupportedTokens(
  fiatCurrency: FiatCurrencyInfo,
  countryCode?: string,
): FiatOnRampCurrency[] {
  const { data: quoteCurrencyOptions } = useFiatOnRampAggregatorSupportedTokensQuery({
    fiatCurrency: fiatCurrency.code,
    countryCode: countryCode ?? 'US',
  })

  return useMemo(() => {
    return (
      quoteCurrencyOptions?.supportedTokens?.map((currency) => {
        const meldCurrencyCode = currency.cryptoCurrencyCode
        const currencyInfo = meldSupportedCurrencyToCurrencyInfo(currency)
        return { currencyInfo, meldCurrencyCode }
      }) ?? []
    )
  }, [quoteCurrencyOptions?.supportedTokens])
}
