import { Center, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { User } from "../domain/user";
import { useEffect, useState } from "react";
import { getAllSkills, getUser, getUserSkill } from "../utils/suapbaseFunction";
import { Skill } from "../domain/skill";

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
        console.log(newSkills)
        setSkills(newSkills);
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
          <p>名前：{user?.name}</p>
          <p>自己紹介：{user?.description}</p>
          <p>スキル：{skills?.map(skill => ( skill.name ))}</p>
          <p>Github：{user?.github_id}</p>
          <p>Qitta：{user?.qiita_id}</p>
          <p>X：{user?.x_id}</p>
        </div>
      )}
    </>
  );
};
