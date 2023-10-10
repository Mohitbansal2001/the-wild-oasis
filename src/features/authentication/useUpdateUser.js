import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateCurrentUser } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: ({ fullName, avatar ,password}) =>
      UpdateCurrentUser({ fullName, avatar ,password}),
    onSuccess: (user={} ) => {
      toast.success("User successfully updated");
      queryClient.setQueryData(["user"], user.user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateUser, isLoading };
}
