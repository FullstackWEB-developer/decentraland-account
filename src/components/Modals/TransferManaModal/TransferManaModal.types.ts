import { Dispatch } from 'redux'
import { ModalProps } from 'dcl-dapps/dist/providers/ModalProvider/ModalProvider.types'
import {
  fetchManaPriceRequest,
  transferManaRequest,
} from '../../../modules/mana/actions'

export type Props = ModalProps & {
  isLoading: boolean
  manaEth: number
  manaMatic: number
  manaPrice: number
  onTransferMana: typeof transferManaRequest
  onManaPrice: typeof fetchManaPriceRequest
}

export type State = {}

export type MapState = Props
export type MapDispatch = Dispatch
export type MapDispatchProps = Pick<Props, 'onTransferMana' | 'onManaPrice'>
