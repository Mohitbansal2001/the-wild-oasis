import React from "react";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import { useGuests } from "./useGuests";
import GuestRow from "./GuestRow";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";

function GuestTable() {
  const { isLoading, guests } = useGuests();
  if (isLoading) return <Spinner />;
  if (!guests.length) return <Empty resourceName="guests" />;

  return (
    <Menus>
      <Table columns="0.6fr 1.1fr 2.5fr 1.3fr 1.5fr 0.5fr">
        <Table.Header>
          <div></div>
          <div>Full Name</div>
          <div>Email</div>
          <div>national ID</div>
          <div>nationality</div>
        
          <div></div>
        </Table.Header>

        <Table.Body
          data={guests}
          render={(guest) => <GuestRow guest={guest} key={guest.id} />}
        />
      </Table>
    </Menus>
  );
}

export default GuestTable;
