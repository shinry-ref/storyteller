import { useParams } from "react-router-dom";

export const CardDetails = () => {
  const { id } = useParams();

  return (
    <>
      <p>id:{id}</p>
    </>
  );
};
