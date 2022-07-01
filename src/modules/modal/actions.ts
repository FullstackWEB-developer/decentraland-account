import { getModalActions } from 'dcl-dapps/dist/modules/modal/actions'
import { ModalName } from './types'

const { openModal, closeModal, toggleModal } = getModalActions<ModalName>()

export * from 'dcl-dapps/dist/modules/modal/actions'
export { openModal, closeModal, toggleModal }
