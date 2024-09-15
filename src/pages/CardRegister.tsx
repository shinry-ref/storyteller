import { Box, Button, Card, CardBody, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Skill } from "../types/skill";
import { getAllSkills } from "../utils/suapbaseFunction";
import { Form, useForm } from "react-hook-form";

type FormData = {
  userId: string;
  name: string;
  description: string;
  skill: string;
};

export const CardRegister = () => {
  const [skills, setSkills] = useState<Skill[]>();
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormData>();
  const userId = watch('userId');
  const name = watch('name');
  const description = watch('description');
  const skill = watch('skill');

  useEffect(() => {
    const getAllRecords = async () =>{
      try {
        const newSkills = await getAllSkills();
        setSkills(newSkills);
      } catch (error){
        console.error("Failed to fetch records:", error);
      }
    }
    getAllRecords();
  }, []);

  const onSubmit = (data) => {
    console.log(JSON.stringify(data))
  };

  return (
    <>
      <Flex justify='center' align='center' p={4} bg='gray.200'  flexDirection="column">
        <Box display='block'>
          <Heading textAlign='center' as='h3' size='lg' mb={4}>新規名刺登録</Heading>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card w='90vw'>
            <CardBody>
              <FormControl mb={4} isInvalid={!!errors.userId}>
                <FormLabel>英単語(ID) <span style={{ color: 'red' }}>*</span></FormLabel>
                <Input
                  placeholder="sample_id"
                  {...register("userId", {
                    required: "必須項目です",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*-)[a-z-]+$/,
                      message: "小文字の英字とハイフンをそれぞれ1文字以上含めてください"
                    }
                  })} />
                <FormErrorMessage>{errors.userId?.message}</FormErrorMessage>
              </FormControl>
              <FormControl mb={4} isInvalid={!!errors.name}>
                <FormLabel>名前 <span style={{ color: 'red' }}>*</span></FormLabel>
                <Input
                  placeholder="山田 太郎"
                  {...register("name", {
                    required: "必須項目です"
                  })} />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl mb={4} isInvalid={!!errors.description}>
                <FormLabel>自己紹介 <span style={{ color: 'red' }}>*</span></FormLabel>
                <Textarea
                  placeholder="<h1>好きな食べ物は〇〇です。</h1>"
                  {...register("description", {
                    required: "必須項目です"
                  })} />
                <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
              </FormControl>
              <FormControl mb={4} isInvalid={!!errors.skill}>
                <FormLabel>好きな技術 <span style={{ color: 'red' }}>*</span></FormLabel>
                  <Select
                    placeholder='選択してください'
                    {...register("skill", {
                      required: "必須項目です"
                    })} >
                    {skills?.map((skill) => (
                      <option key={skill.id} value={skill.name}>{skill.name}</option>
                    ))}
                  </Select>
                <FormErrorMessage>{errors.skill?.message}</FormErrorMessage>
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
            <Button type="submit" colorScheme='teal' data-testid="submit" mx={4} mb={4}>登録</Button>
          </Card>
        </form>
      </Flex>
    </>
  );
};
