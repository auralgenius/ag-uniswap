import dayjs from 'dayjs'
import { uniswapUrls } from 'uniswap/src/constants/urls'
import { objectToQueryString } from 'uniswap/src/data/utils'
import { FOR_API_HEADERS } from 'uniswap/src/features/fiatOnRamp/constants'
import { FORTransactionResponse, FiatOnRampTransactionDetails } from 'uniswap/src/features/fiatOnRamp/types'
import { TransactionStatus } from 'uniswap/src/features/transactions/types/transactionDetails'
import { logger } from 'utilities/src/logger/logger'
import { ONE_MINUTE_MS } from 'utilities/src/time/time'
import { extractFiatOnRampTransactionDetails } from 'wallet/src/features/transactions/history/conversion/extractFiatOnRampTransactionDetails'

const FIAT_ONRAMP_STALE_TX_TIMEOUT = ONE_MINUTE_MS * 20
const FIAT_ONRAMP_FORCE_FETCH_TX_TIMEOUT = ONE_MINUTE_MS * 5

/**
 * Utility to fetch fiat onramp transactions
 */
export async function fetchFiatOnRampTransaction(
  previousTransactionDetails: FiatOnRampTransactionDetails,
  forceFetch: boolean,
): Promise<FiatOnRampTransactionDetails | undefined> {
  const isRecent = dayjs(previousTransactionDetails.addedTime).isAfter(
    dayjs().subtract(FIAT_ONRAMP_FORCE_FETCH_TX_TIMEOUT, 'ms'),
  )
  const requestParams = {
    sessionId: previousTransactionDetails.id,
    // Force fetch if requested or for the first 3 minutes after the transaction was added
    forceFetch: forceFetch || isRecent,
  }
  const res = await fetch(`${uniswapUrls.fiatOnRampApiUrl}/transaction?${objectToQueryString(requestParams)}`, {
    headers: FOR_API_HEADERS,
  })
  const { transaction }: FORTransactionResponse = await res.json()
  if (!transaction) {
    const isStale = dayjs(previousTransactionDetails.addedTime).isBefore(
      dayjs().subtract(FIAT_ONRAMP_STALE_TX_TIMEOUT, 'ms'),
    )

    if (isStale) {
      logger.debug(
        'fiatOnRamp/api',
        'fetchFiatOnRampTransaction',
        `Transaction with id ${previousTransactionDetails.id} not found.`,
      )

      return {
        ...previousTransactionDetails,
        // use `Unknown` status to denote a transaction missing from backend
        // this transaction will later get deleted
        status: TransactionStatus.Unknown,
      }
    } else {
      logger.debug(
        'fiatOnRamp/api',
        'fetchFiatOnRampTransaction',
        `Transaction with id ${previousTransactionDetails.id} not found, but not stale yet (${dayjs()
          .subtract(previousTransactionDetails.addedTime, 'ms')
          .unix()}s old).`,
      )

      return previousTransactionDetails
    }
  }

  return extractFiatOnRampTransactionDetails(transaction)
}