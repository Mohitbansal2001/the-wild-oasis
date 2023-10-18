import { PAGE_SIZE } from "../utils/constants";
import supabase, { supabaseUrl } from "./supabase";
export async function getAllGuests() {
  const { data, error } = await supabase.from("guests").select("*");

  if (error) {
    console.error(error);
    throw new Error("Guests could not be loaded");
  }

  return data;
}

export async function getGuests({ page }) {
  let query = supabase.from("guests").select("*", { count: "exact" });

  if (page) {
    // console.log({ page });
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Guests could not be loaded");
  }
  return { data, count };
}
export async function deleteGuest(id) {
  const { data, error } = await supabase.from("guests").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("guest could not be deleted");
  }

  return data;
}

export async function createEditGuest(newGuest, id,) {
  const hasImagePath = newGuest.image?.startsWith?.(supabaseUrl);


  const imageName = `${Math.random()}-${newGuest.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newGuest.image
    : `${supabaseUrl}/storage/v1/object/public/guest-images/${imageName}`;

  // 1. Create/edit guest
  let query = supabase.from("guests");

  // A) CREATE
  if (!id) query = query.insert([{ ...newGuest, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newGuest, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("guest-images")
    .upload(imageName, newGuest.image);

  // 3. Delete the guest IF there was an error uploading image
  if (storageError) {
    await supabase.from("guests").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Guest image could not be uploaded and the guest was not created"
    );
  }

  return data;
}
