import { Box, Button, Card, CardBody, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, Textarea, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Skill } from "../types/skill";
import { addUser, addUserSkill, getAllSkills } from "../utils/suapbaseFunction";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormData = {
  userId: string;
  name: string;
  description: string;
  skill: string;
  githubId: string;
  qiitaId: string;
  xId: string;
};

export const CardRegister = () => {
  const [skills, setSkills] = useState<Skill[]>();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();
  // const userId = watch('userId');
  // const name = watch('name');
  // const description = watch('description');
  // const skill = watch('skill');
  // const githubId = watch('githubId');
  // const qiitaId = watch('qiitaId');
  // const xId = watch('xId');

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

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await addUser(data.userId, data.name, data.description, data.githubId, data.qiitaId, data.xId);
      await addUserSkill(data.userId, data.skill);
    } catch (error){
      console.error("error:", error);
      toast({
        title: "登録に失敗しました",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } finally{
      setLoading(false);
      navigate("/");
      toast({
        title: "登録に成功しました",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      <Flex h='100%' justify='center' align='center' p={4} bg='gray.200' flexDirection="column">
        <Box display='block'>
          <Heading textAlign='center' as='h3' size='lg' mb={4}>新規名刺登録</Heading>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card w='338px'>
            <CardBody>
              <FormControl mb={4} isInvalid={!!errors.userId}>
                <FormLabel>英単語(ID) <span style={{ color: 'red' }}>*</span></FormLabel>
                <Input
                  placeholder="sample_id"
                  {...register("userId", {
                    required: "必須項目です",
                    pattern: {
                      value: /^(?=.*[a-z])[a-z_]+$/,
                      message: "小文字の英語含めてください(アンダースコアも可)"
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
                      <option key={skill.id} value={skill.id}>{skill.name}</option>
                    ))}
                  </Select>
                <FormErrorMessage>{errors.skill?.message}</FormErrorMessage>
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Github ID</FormLabel>
                <Input
                  placeholder="github_id"
                  {...register("githubId", {
                  })}
                  />
                <FormErrorMessage></FormErrorMessage>
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Qiita ID</FormLabel>
                <Input
                  placeholder="qiita_id"
                  {...register("qiitaId", {
                  })}
                  />
                <FormErrorMessage></FormErrorMessage>
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>X ID</FormLabel>
                <Input
                  placeholder="x_id"
                  {...register("xId", {
                  })}
                  />
                <FormErrorMessage></FormErrorMessage>
              </FormControl>
            </CardBody>
            <Button isLoading={loading} type="submit" colorScheme='teal' data-testid="submit" mx={4} mb={4}>登録</Button>
          </Card>
        </form>
        <Button onClick={() => navigate('/')} colorScheme='teal' w='338px' m={4} display='block'>戻る</Button>
      </Flex>
    </>
  );
};
