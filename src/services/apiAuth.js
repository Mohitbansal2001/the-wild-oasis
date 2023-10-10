import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logOut() {
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function signup({ email, password, fullName }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  console.log(data);
  if (error) throw new Error(error.message);
  return data;
}
export async function UpdateCurrentUser({ fullName, avatar, password }) {
  // update fullName or password
  let updateData;
  if (password) updateData = { password };
  if (fullName)
    updateData = {
      data: { fullName },
    };

  const { data, error } = await supabase.auth.updateUser(updateData);

  console.log(data);
  if (error) throw new Error(error.message);
  if (!avatar) return data;
  // upload avatar image
  const fileName = `avatar${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);
  // update user
  const { data: updatedUser, error: updatedError } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (updatedError) throw new Error(updatedError.message);
  return updatedUser;
}
