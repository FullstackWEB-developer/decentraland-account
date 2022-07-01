import * as React from 'react'
import { Close } from 'dcl-ui'
import { ModalProps } from 'dcl-dapps/dist/providers/ModalProvider/ModalProvider.types'
import Modal from 'dcl-dapps/dist/containers/Modal'
import './TestModal.css'

export default class TestModal extends React.PureComponent<ModalProps> {
  render() {
    const { name, onClose } = this.props

    return (
      <Modal name={name} closeIcon={<Close onClick={onClose} />}>
        <Modal.Header>Hello World</Modal.Header>
        <Modal.Content>bla bla bla</Modal.Content>
      </Modal>
    )
  }
}
