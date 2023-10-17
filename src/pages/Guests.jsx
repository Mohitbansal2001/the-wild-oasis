import React from 'react'
import Row from '../ui/Row'
import Heading from '../ui/Heading'
import CabinTableOperations from '../features/cabins/CabinTableOperations'
import CabinTable from '../features/cabins/CabinTable'
import AddCabin from '../features/cabins/AddCabin'
import GuestTable from '../features/Guests/GuestTable'
import AddGuest from '../features/Guests/AddGuest'

function Guests() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        {/* <CabinTableOperations /> */}
      </Row>

      <Row>
        <GuestTable />
        <AddGuest />
      </Row>
    </>
  )
}

export default Guests