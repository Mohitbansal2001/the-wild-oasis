import React from 'react'
import CreateCabinForm from '../cabins/CreateCabinForm'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'

function AddGuest() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="guest-form">
          <Button>Add new Guest</Button>
        </Modal.Open>
        <Modal.Window name="guest-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  )
}

export default AddGuest