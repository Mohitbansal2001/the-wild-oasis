import { useNavigate } from "react-router-dom";

export function useMoveBack() {
  // const navigate = useNavigate();

  return () => window.history.back();
}
