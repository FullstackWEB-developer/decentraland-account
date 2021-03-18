import React from 'react'
import { Props } from './AccountTransaction.types'
import './AccountTransaction.css'
import {
  Deposit,
  Send,
  TransactionStatus,
  TransactionType,
  Withdrawal,
  WithdrawalStatus,
} from '../../../../../modules/mana/types'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'

const AccountTransaction = ({
  transaction,
  onTransactionDetail,
  onPendingWithDrawal,
}: Props) => {
  const { type, status } = transaction
  const shortening = (address: string): string =>
    address ? `${address.slice(0, 4)}...${address.slice(-4)}` : ''

  let data: any
  let description = ''
  if (type === TransactionType.DEPOSIT) {
    description = t('transaction_description.deposit')
    data = transaction.data as Deposit
  } else if (type === TransactionType.WITHDRAWAL) {
    description = t('transaction_description.withdrawal')
    data = transaction.data as Withdrawal
  } else if (type === TransactionType.BUY) {
    description = t('transaction_description.buy')
  } else if (type === TransactionType.SEND) {
    data = transaction.data as Send
    description = `${t('transaction_description.send')} ${shortening(data.to)}`
  }

  let transactionLogo = ''
  if (type === TransactionType.DEPOSIT || type === TransactionType.BUY) {
    transactionLogo = 'in-transaction-logo'
  } else if (
    type === TransactionType.WITHDRAWAL ||
    type === TransactionType.SEND
  ) {
    transactionLogo = 'out-transaction-logo'
  } else if (status === TransactionStatus.PENDING) {
    transactionLogo = 'pending-transaction-logo'
  } else if (status === TransactionStatus.REJECTED) {
    transactionLogo = 'rejected-transaction-logo'
  }

  const handleDetailModal = () => {
    if (
      type === TransactionType.WITHDRAWAL &&
      data.status === WithdrawalStatus.PENDING
    ) {
      onPendingWithDrawal(data.txHash)
    } else {
      onTransactionDetail(description, data.amount, status, type)
    }
  }
  return (
    <div className="AccountTransaction" onClick={handleDetailModal}>
      <div className="type">
        <div className={`transaction-logo ${transactionLogo}`} />
      </div>
      <div className="DescriptionStatus">
        <div> {description} </div>
        <div> {status} </div>
      </div>
      <div className="amount"> {data?.amount} </div>
    </div>
  )
}

export default React.memo(AccountTransaction)
