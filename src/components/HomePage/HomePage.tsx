import React from 'react'
import { Network } from '@dcl/schemas'
import { Page } from 'dcl-ui'
import { DepositStatus, WithdrawalStatus } from '../../modules/mana/types'
import DepositTooltip from '../Tooltips/DepositTooltip'
import WithdrawalTooltip from '../Tooltips/WithdrawalTooltip'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { AccountHeader } from './AccountHeader'
import { AccountCard } from './AccountCard'
import { AccountCardContainer } from './AccountCardContainer'
import { Props } from './HomePage.types'
import './HomePage.css'

const HomePage: React.FC<Props> = ({ withdrawals, deposits, transactionsByNetwork }) => {

  const ethereumTransactions = transactionsByNetwork[Network.ETHEREUM]
  // const maticTransactions = transactionsByNetwork[Network.MATIC]

  const isFirstWithdrawal =
    withdrawals.length === 1 &&
    withdrawals[0].status === WithdrawalStatus.PENDING
  const isFirstDeposits =
    deposits.length === 1 && deposits[0].status === DepositStatus.PENDING

  return (
    <>
      <Navbar />
      <Page className="HomePage">
        <AccountHeader />
        <AccountCardContainer>
          <AccountCard
            network={Network.ETHEREUM}
            title="SEED"
            transactions={ethereumTransactions}
          />
          {/* <AccountCard
            network={Network.MATIC}
            title="Polygon MANA"
            transactions={maticTransactions}
          /> */}
        </AccountCardContainer>
        {isFirstDeposits ? (
          <DepositTooltip />
        ) : isFirstWithdrawal ? (
          <WithdrawalTooltip />
        ) : null}
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(HomePage)
