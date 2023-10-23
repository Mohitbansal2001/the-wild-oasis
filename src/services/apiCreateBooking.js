import supabase from "./supabase";

export async function createEditBooking(newBooking = {}, id) {
  let query = supabase.from("bookings");

  // A) CREATE
  if (!id) query = query.insert([{ ...newBooking }]);

  // B) EDIT
  if (id) query = query.update({ ...newBooking }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  return data;
}
