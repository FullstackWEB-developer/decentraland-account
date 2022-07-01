import React from 'react'
import { t } from 'dcl-dapps/dist/modules/translation/utils'
import { getChainIdByNetwork } from 'dcl-dapps/dist/lib/eth'
import { getTransactionHref } from 'dcl-dapps/dist/modules/transaction/utils'
import { Network } from '@dcl/schemas'
import { Radio } from 'dcl-ui'
import { Props } from './WithdrawInitialized.types'
import LinkWrapper from '../LinkWrapper'

const WithdrawInitialized = ({ withdrawal }: Props) => {
  const { initializeHash } = withdrawal

  const href = getTransactionHref(
    { txHash: initializeHash },
    getChainIdByNetwork(Network.MATIC)
  )

  return (
    <LinkWrapper href={href}>
      <Radio
        checked={true}
        label={t('withdrawal_status_modal.status_initialized')}
      />
    </LinkWrapper>
  )
}

export default React.memo(WithdrawInitialized)
