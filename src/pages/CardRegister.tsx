import { Box, Button, Card, CardBody, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Skill } from "../types/skill";
import { getAllSkills } from "../utils/suapbaseFunction";

export const CardRegister = () => {
  const [skills, setSkills] = useState<Skill[]>();

  useEffect(() => {
    const getAllRecords = async () =>{
      try {
        const newSkills = await getAllSkills();
        console.log(newSkills);
        setSkills(newSkills);
      } catch (error){
        console.error("Failed to fetch records:", error);
      }
    }
    getAllRecords();
  }, []);

  return (
    <>
      <Flex justify='center' align='center' p={4} bg='gray.200'  flexDirection="column">
        <Box display='block'>
          <Heading textAlign='center' as='h3' size='lg' mb={4}>新規名刺登録</Heading>
        </Box>
        <Card w='90vw'>
          <CardBody>
            <FormControl mb={4}>
              <FormLabel>英単語(ID)</FormLabel>
              <Input
                placeholder="sample_id"
                />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>名前</FormLabel>
              <Input
                placeholder="山田 太郎"
                />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>自己紹介</FormLabel>
              <Textarea
                placeholder="<h1>好きな食べ物は〇〇です。</h1>"
                />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>好きな技術</FormLabel>
                <Select placeholder='選択してください'>
                  {skills?.map((skill) => (
                    <option key={skill.id} value={skill.name}>{skill.name}</option>
                  ))}
                </Select>
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Github ID</FormLabel>
              <Input
                placeholder="github_id"
                />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Qiita ID</FormLabel>
              <Input
                placeholder="qiita_id"
                />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>X ID</FormLabel>
              <Input
                placeholder="x_id"
                />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
          </CardBody>
          <Button type={"submit"} colorScheme='teal' data-testid="submit" mx={4} mb={4}>登録</Button>
        </Card>
      </Flex>
    </>
  );
};
