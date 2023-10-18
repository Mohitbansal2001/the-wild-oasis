import Button from "../../ui/Button";
import CreateCabinForm from "../cabins/CreateCabinForm";
import Modal from "../../ui/Modal";
// import { createBooking } from "../../services/apiBookings";
// import { createGuests } from "../../services/apiBookings";
import CreateBookingForm from "./CreateBookingForm";

import { useState } from "react";

function AddBooking() {
  const [isLoading, setIsLoading] = useState(false);
  // async function uploadBooking() {
  //   setIsLoading(true);
  //   // await createBooking();
  //   // await createGuests();
  //   setIsLoading(false);
  // }

  return (
    <>
      {/* <Button onClick={uploadBooking} disabled={isLoading}>
        Add
      </Button> */}

      <Modal>
        <Modal.Open opens="booking-form">
          <Button>Add new booking</Button>
        </Modal.Open>
        <Modal.Window name="booking-form">
          <CreateBookingForm />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default AddBooking;
