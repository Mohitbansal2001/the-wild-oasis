import { useMoveBack } from "../hooks/useMoveBack";
import ButtonText from "./ButtonText";

function Empty({ resourceName }) {
  const moveBack = useMoveBack();
  return (
    <span>
      <p>No {resourceName} could be found.</p>
      <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
    </span>
  );
}

export default Empty;
