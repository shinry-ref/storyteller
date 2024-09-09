import { Center, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { User } from "../domain/user";
import { useEffect, useState } from "react";
import { getAllUsers } from "../utils/suapbaseFunction";

export const CardDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAllRecords = async () =>{
      setLoading(true);
      try {
        const newUsers = await getAllUsers();
        setUser(newUsers.find((user) => user.id == id));
      } catch (error){
        console.error("Failed to fetch records:", error);
      } finally {
        setLoading(false);
      }
    }
    getAllRecords();
  }, []);

  return (
    <>
      { loading ? (
      <Center h="100vh">
        <Spinner data-testid="spinner" />
      </Center>
      ) : (
        <div>
          <p>{user?.id}</p>
          <p>{user?.name}</p>
          <p>{user?.description}</p>
          <p>{user?.github_id}</p>
          <p>{user?.x_id}</p>
        </div>
      )}
    </>
  );
};
