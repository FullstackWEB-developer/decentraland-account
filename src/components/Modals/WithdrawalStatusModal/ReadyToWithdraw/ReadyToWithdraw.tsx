import React from 'react'
import { t } from 'dcl-dapps/dist/modules/translation/utils'
import { Radio } from 'dcl-ui'
import { Props } from './ReadyToWithdraw.types'
import { WithdrawalStatus } from '../../../../modules/mana/types'
import './ReadyToWithdraw.css'

const ReadyToWithdraw = ({ withdrawal }: Props) => {
  const { status } = withdrawal

  const statusClassName =
    status === WithdrawalStatus.CHECKPOINT ||
    status === WithdrawalStatus.COMPLETE
      ? ''
      : 'yellow_check'

  return (
    <div className="ReadyToWithdraw">
      <Radio
        checked={true}
        className={`${statusClassName} default_cursor`}
        label={t('withdrawal_status_modal.status_checkpoint')}
      />
      <div className="status_checkpoint_placeholder">
        {t('withdrawal_status_modal.status_checkpoint_placeholder')}
      </div>
    </div>
  )
}

export default React.memo(ReadyToWithdraw)
