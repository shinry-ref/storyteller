import { Box, Button, Card, CardBody, Center, Flex, Heading, Icon, Spinner, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../types/user";
import { Skill } from "../types/skill";
import { useEffect, useState } from "react";
import { getSelectAllSkills, getUser, getUserSkill } from "../utils/supabaseFunction";
import { PrimaryLink } from "../components/atoms/PrimaryLink";
import { ImPower } from "react-icons/im";
import { FaBookReader, FaGithub } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { SiQiita } from "react-icons/si";
import { BsTwitterX } from "react-icons/bs";

export const CardDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const [skills, setSkills] = useState<Skill[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllNameCard = async () =>{
      setLoading(true);
      try {
        const newUser = await getUser(id);
        setUser(newUser);
        const userSkill = await getUserSkill(newUser.id);
        const newSkills = await getSelectAllSkills(userSkill.skill_id);
        setSkills(newSkills);
      } catch (error){
        console.error("error:", error);
      } finally {
        setLoading(false);
      }
    }
    getAllNameCard();
  }, [id]);

  return (
    <>
      { loading ? (
      <Center h="100vh">
        <Spinner data-testid="spinner" />
      </Center>
      ) : (
        <Flex h='100vh' justify='center' align='center' p={4} bg='gray.200' flexDirection="column">
          <Card minH='200px' w='338px' bg='cyan.100'>
            <CardBody>
              <Heading textAlign='center' as='h3' size='lg' mb={4}  data-testid="name">
                {user?.name}
              </Heading>
              <Box>
                <Text textAlign='center'><Icon as={FaBookReader} boxSize={4} /> 自己紹介</Text>
                <Box height="1px" backgroundColor="gray.400" mb={2}/>
                <Box bg='white' p={1} mb={4} borderRadius={4} dangerouslySetInnerHTML={{__html: user?.description || '' }}></Box>
              </Box>
              <Box>
                <Text textAlign='center'><Icon as={ImPower} boxSize={4} /> スキル</Text>
                <Box height="1px" backgroundColor="gray.400" mb={2}/>
                <Box bg='white' p={1} mb={4} borderRadius={4} textAlign='center'>{skills?.map(skill => ( skill.name ))}</Box>
              </Box>
              <Box>
                <Text textAlign='center'><Icon as={FaLink} boxSize={4} /> 外部リンク</Text>
                <Box height="1px" backgroundColor="gray.400" mb={2}/>
                <Box bg='white' borderRadius={4}>
                  <Flex align="center"  justify="space-evenly">
                    <PrimaryLink href={user?.github_id}><Icon as={FaGithub} boxSize={6} /></PrimaryLink>
                    <PrimaryLink href={user?.qiita_id}><Icon as={SiQiita} boxSize={10} /></PrimaryLink>
                    <PrimaryLink href={user?.x_id}><Icon as={BsTwitterX} boxSize={4} /></PrimaryLink>
                  </Flex>
                </Box>
              </Box>
            </CardBody>
          </Card>
          <Button onClick={() => navigate('/')} colorScheme='teal' w='338px' m={4} display='block'>戻る</Button>
        </Flex>
      )}
    </>
  );
};
