import supabase, { supabaseUrl } from "./supabase";

export async function getGuests() {
  const { data, error } = await supabase.from("guests").select("*");

  if (error) {
    console.error(error);
    throw new Error("Guests could not be loaded");
  }

  return data;
}
export async function deleteGuest(id) {
    const { data, error } = await supabase.from("guests").delete().eq("id", id);
  
    if (error) {
      console.error(error);
      throw new Error("guest could not be deleted");
    }
  
    return data;
  }