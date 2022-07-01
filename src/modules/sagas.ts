import { all } from 'redux-saga/effects'
import { createAnalyticsSaga } from 'dcl-dapps/dist/modules/analytics/sagas'
import { createProfileSaga } from 'dcl-dapps/dist/modules/profile/sagas'
import { createTranslationSaga } from 'dcl-dapps/dist/modules/translation/sagas'
import { transactionSaga } from 'dcl-dapps/dist/modules/transaction/sagas'
import { createWalletSaga } from 'dcl-dapps/dist/modules/wallet/sagas'
import { toastSaga } from 'dcl-dapps/dist/modules/toast/sagas'
import { TRANSACTIONS_API_URL } from './mana/utils'
import { modalSaga } from './modal/sagas'
import { locationSaga } from './location/sagas'
import { manaSaga } from './mana/sagas'
import { transakSaga } from './transak/sagas'
import { profileSaga as localProfileSaga } from './profile/sagas'
import { config } from '../config'
import * as translations from '../locales'

const analyticsSaga = createAnalyticsSaga()

const profileSaga = createProfileSaga({
  peerUrl: config.get('PEER_URL')!,
})

const translationSaga = createTranslationSaga({ translations })

const walletSaga = createWalletSaga({
  CHAIN_ID: +(config.get('CHAIN_ID') || 1),
  POLL_INTERVAL: 0,
  TRANSACTIONS_API_URL,
})

export function* rootSaga() {
  yield all([
    analyticsSaga(),
    transactionSaga(),
    profileSaga(),
    walletSaga(),
    translationSaga(),
    modalSaga(),
    locationSaga(),
    manaSaga(),
    toastSaga(),
    transakSaga(),
    localProfileSaga(),
  ])
}
