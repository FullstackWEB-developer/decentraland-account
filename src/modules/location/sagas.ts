import { takeEvery, put, select } from 'redux-saga/effects'
import {
  CONNECT_WALLET_SUCCESS,
  ConnectWalletSuccessAction,
} from 'dcl-dapps/dist/modules/wallet/actions'
import { push, getLocation } from 'connected-react-router'
import { locations } from '../locations'

export function* locationSaga() {
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleConnectWalletSuccess)
}

function* handleConnectWalletSuccess(_action: ConnectWalletSuccessAction) {
  const location: ReturnType<typeof getLocation> = yield select(getLocation)
  if (location.pathname === locations.signIn()) {
    yield put(push(locations.root()))
  }
}
