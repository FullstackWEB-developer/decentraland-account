import { connect } from 'react-redux'
import { RootState } from '../../../modules/reducer'
import { MapDispatch, MapDispatchProps } from './WithdrawalStatusModal.types'
import WithdrawalStatusModal from './WithdrawalStatusModal'
import {
  getLoading,
  getTransactions,
  getWithdrawals,
} from '../../../modules/mana/selectors'
import {
  finishWithdrawalRequest,
  FINISH_WITHDRAWAL_REQUEST,
} from '../../../modules/mana/actions'
import { isLoadingType } from 'dcl-dapps/dist/modules/loading/selectors'

const mapState = (state: RootState) => ({
  isLoading: isLoadingType(getLoading(state), FINISH_WITHDRAWAL_REQUEST),
  withdrawals: getWithdrawals(state),
  transactions: getTransactions(state),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onFinishWithdrawal: (withdrawal) =>
    dispatch(finishWithdrawalRequest(withdrawal)),
})

export default connect(mapState, mapDispatch)(WithdrawalStatusModal)
