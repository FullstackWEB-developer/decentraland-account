import React from 'react'
import { t } from 'dcl-dapps/dist/modules/translation/utils'
import { getChainIdByNetwork } from 'dcl-dapps/dist/lib/eth'
import { getTransactionHref } from 'dcl-dapps/dist/modules/transaction/utils'
import { Network } from '@dcl/schemas'
import { Radio } from 'dcl-ui'
import LinkWrapper from '../LinkWrapper'
import { WithdrawalStatus } from '../../../../modules/mana/types'
import { Props } from './CompleteWithdrawal.types'

const CompleteWithdrawal = ({ withdrawal }: Props) => {
  const { status, finalizeHash } = withdrawal

  const href =
    finalizeHash &&
    getTransactionHref(
      { txHash: finalizeHash },
      getChainIdByNetwork(Network.ETHEREUM)
    )

  const radio = (
    <Radio
      className={!href ? 'default_cursor' : undefined}
      checked={status === WithdrawalStatus.COMPLETE}
      label={t('withdrawal_status_modal.status_completed')}
    />
  )

  return href ? <LinkWrapper href={href}>{radio}</LinkWrapper> : radio
}

export default React.memo(CompleteWithdrawal)
