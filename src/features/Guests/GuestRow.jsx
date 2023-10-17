import React from "react";
import Table from "../../ui/Table";
import { Flag } from "../../ui/Flag";
import styled from "styled-components";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiPencil, HiTrash } from "react-icons/hi2";
import CreateGuestForm from "./CreateGuestForm";
import {useDeleteGuest} from "./useDeleteGuest"
import ConfirmDelete from "../../ui/ConfirmDelete";


const GuestName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;
const GuestEmail = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

function GuestRow({ guest }) {
    const { isDeleting, deleteGuest } = useDeleteGuest();
    const {
        id: guestId,
        fullName,
        email,
        nationality,
        nationalID,
        countryFlag,
    } = guest;

  
  return <Table.Row>
    <img src="" alt="image" />
    <GuestName>{fullName}</GuestName>
    <GuestEmail>{email}</GuestEmail>
    <div>{nationalID}</div>
    <div className="d-flex">{nationality} &nbsp; <Flag src={countryFlag}/></div>
    {/* <Flag src={countryFlag}/> */}
    <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={guestId} />

            <Menus.List id={guestId}>
              

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateGuestForm guestToEdit={guest} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="guest"
                disabled={isDeleting}
                onConfirm={() => deleteGuest(guestId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
  </Table.Row>;
}

export default GuestRow;
