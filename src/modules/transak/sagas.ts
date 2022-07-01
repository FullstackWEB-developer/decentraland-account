import {
  ConnectWalletSuccessAction,
  CONNECT_WALLET_SUCCESS,
} from 'dcl-dapps/dist/modules/wallet/actions'
import { getAddress } from 'dcl-dapps/dist/modules/wallet/selectors'
import { call, select, takeEvery } from 'redux-saga/effects'
import { store } from '../store'
import { OPEN_TRANSAK, OpenTransakAction } from './actions'
import { initializeTransak, openTransakWidget } from './utils'

export function* transakSaga() {
  yield takeEvery(OPEN_TRANSAK, handleOpenTransak)
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleConnectWalletSuccess)
}

function* handleOpenTransak(action: OpenTransakAction) {
  const { network } = action.payload
  const address: string = yield select(getAddress)
  openTransakWidget(address, network)
}

function* handleConnectWalletSuccess(action: ConnectWalletSuccessAction) {
  yield call(() => {
    initializeTransak(store, action.payload.wallet.address)
  })
}
