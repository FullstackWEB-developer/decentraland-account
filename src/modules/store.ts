import { applyMiddleware, compose, createStore } from 'redux'
import createSagasMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { createLogger } from 'redux-logger'
import { createStorageMiddleware } from 'dcl-dapps/dist/modules/storage/middleware'
import { storageReducerWrapper } from 'dcl-dapps/dist/modules/storage/reducer'
import { createTransactionMiddleware } from 'dcl-dapps/dist/modules/transaction/middleware'
// import { createAnalyticsMiddleware } from 'dcl-dapps/dist/modules/analytics/middleware'
import { createRootReducer } from './reducer'
import { rootSaga } from './sagas'
import {
  SET_DEPOSIT_STATUS,
  SET_PURCHASE,
  SET_WITHDRAWAL_STATUS,
  WATCH_DEPOSIT_STATUS_SUCCESS,
  WATCH_WITHDRAWAL_STATUS_SUCCESS,
} from './mana/actions'
import { isTest } from '../lib/environment'
import { config } from '../config'
import migrations from './migrations'
import { Env } from '@dcl/ui-env'

export const history = require('history').createBrowserHistory()
const rootReducer = storageReducerWrapper(createRootReducer(history))
console.log('🚀 ~ file: store.ts ~ line 20 ~ config', config.getEnv())

const sagasMiddleware = createSagasMiddleware()
const loggerMiddleware = createLogger({
  collapsed: () => true,
  predicate: (_: any, action) =>
    !isTest && (config.is(Env.DEVELOPMENT) || action.type.includes('Failure')),
})

const transactionMiddleware = createTransactionMiddleware()
const { storageMiddleware, loadStorageMiddleware } = createStorageMiddleware({
  storageKey: 'account',
  paths: [
    ['mana', 'data', 'deposits'],
    ['mana', 'data', 'withdrawals'],
    ['mana', 'data', 'purchases'],
  ],
  actions: [
    SET_DEPOSIT_STATUS,
    SET_WITHDRAWAL_STATUS,
    WATCH_DEPOSIT_STATUS_SUCCESS,
    WATCH_WITHDRAWAL_STATUS_SUCCESS,
    SET_PURCHASE,
  ],
  migrations,
})
// const analyticsMiddleware = createAnalyticsMiddleware(
//   config.get('SEGMENT_API_KEY')
// )

const middleware = applyMiddleware(
  sagasMiddleware,
  routerMiddleware(history),
  loggerMiddleware,
  transactionMiddleware,
  // analyticsMiddleware,
  storageMiddleware
)
const enhancer = compose(middleware)
const store = createStore(rootReducer, enhancer)

sagasMiddleware.run(rootSaga)
loadStorageMiddleware(store)

if (config.is(Env.DEVELOPMENT)) {
  const _window = window as any
  _window.store = store
}

export { store }
