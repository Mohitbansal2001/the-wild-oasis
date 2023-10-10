import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as logInApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => logInApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);

      navigate("/dashboard",{replace:true});
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided Email And Password are incorrect");
    },
  });
  return { login, isLoading };
}
