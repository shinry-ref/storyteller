import { Center, Flex, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { User } from "../types/user";
import { useEffect, useState } from "react";
import { getAllSkills, getUser, getUserSkill } from "../utils/suapbaseFunction";
import { Skill } from "../types/skill";
import { PrimaryLink } from "../components/atoms/PrimaryLink";

export const CardDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const [skills, setSkills] = useState<Skill[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAllRecords = async () =>{
      setLoading(true);
      try {
        const newUser = await getUser(id);
        setUser(newUser);
        const userSkill = await getUserSkill(newUser.id);
        const newSkills = await getAllSkills(userSkill.skill_id);
        setSkills(newSkills);
      } catch (error){
        console.error("Failed to fetch records:", error);
      } finally {
        setLoading(false);
      }
    }
    getAllRecords();
  }, [id]);

  return (
    <>
      { loading ? (
      <Center h="100vh">
        <Spinner data-testid="spinner" />
      </Center>
      ) : (
        <Flex direction="column" alignItems="center" p={4}>
          <div>
            <p>名前：{user?.name}</p>
            <p>自己紹介：{user?.description}</p>
            <p>スキル：{skills?.map(skill => ( skill.name ))}</p>
            <PrimaryLink href={user?.github_id}>Github</PrimaryLink>
            <PrimaryLink href={user?.qiita_id}>Qitta</PrimaryLink>
            <PrimaryLink href={user?.x_id}>X</PrimaryLink>
          </div>
        </Flex>
      )}
    </>
  );
};
