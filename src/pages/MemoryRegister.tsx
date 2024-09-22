import { Button, Card, CardBody, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, Textarea, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { addStory, getUser } from "../utils/supabaseFunction";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { User } from "../types/user";
import { createPrompt, startGemini } from "../utils/gemini";

type FormData = {
  title: string;
  date: string;
  category_name: string;
  content: string;
};

export const MemoryRegister = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const getUserRecord = async () =>{
      try {
        const newUser = await getUser(1);
        console.log(newUser)
        setUser(newUser);
      } catch (error){
        console.error("Failed to fetch records:", error);
      }
    }
    getUserRecord();
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      // await addUser(data.userId, data.name, data.description, data.githubId, data.qiitaId, data.xId);
      // await addUserSkill(data.userId, data.skill);
      const prompt = createPrompt(data.title, data.category_name, data.content);
      const response = await startGemini(prompt);
      await addStory(user?.id as number, data.date, data.title, data.category_name, data.content, response)
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
      navigate("/memories/home");
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
      <Flex h='100vh' justify='center' align='center' p={4} bg='gray.200' flexDirection="column">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card w='338px'>
            <CardBody>
              <Heading textAlign='center' as='h3' size='lg' mb={4} data-testid="title">体験を記録</Heading>
              <FormControl mb={4} isInvalid={!!errors.title}>
                <FormLabel>タイトル <span style={{ color: 'red' }}>*</span></FormLabel>
                <Input
                  placeholder="思い出"
                  {...register("title", {
                    required: "必須項目です",
                  })} />
                <FormErrorMessage data-testid="user-id-error">{errors.title?.message}</FormErrorMessage>
              </FormControl>
              <FormControl mb={4} isInvalid={!!errors.date}>
                <FormLabel>日時 <span style={{ color: 'red' }}>*</span></FormLabel>
                <Input
                  type="date" // 日付選択を有効にする
                  placeholder="日時"
                  {...register("date", {
                    required: "必須項目です",
                  })}
                />
                <FormErrorMessage data-testid="user-id-error">{errors.date?.message}</FormErrorMessage>
              </FormControl>
              <FormControl mb={4} isInvalid={!!errors.category_name}>
                <FormLabel>カテゴリ <span style={{ color: 'red' }}>*</span></FormLabel>
                <Select
                  placeholder="カテゴリを選択"
                  {...register("category_name", {
                    required: "必須項目です"
                  })}
                >
                  <option value="オリジナル">オリジナル</option>
                  <option value="明るい">明るい</option>
                  <option value="スカッとする">スカッとする</option>
                  <option value="感動的">感動的</option>
                  <option value="冒険的">冒険的</option>
                  <option value="ロマンチック">ロマンチック</option>
                  <option value="ノスタルジック">ノスタルジック</option>
                  <option value="コメディ">コメディ</option>
                  <option value="ミステリアス">ミステリアス</option>
                </Select>
                <FormErrorMessage data-testid="name-error">
                  {errors.category_name?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl mb={4} isInvalid={!!errors.content}>
                <FormLabel>内容 <span style={{ color: 'red' }}>*</span></FormLabel>
                <Textarea
                  placeholder="今日はランニング10kmしました。"
                  {...register("content", {
                    required: "必須項目です"
                  })} />
                <FormErrorMessage data-testid="description-error">{errors.content?.message}</FormErrorMessage>
              </FormControl>
              <Flex justify='space-between'>
                <Button onClick={() => navigate('/memories/home')} colorScheme='gray' bg='gray.500' color='white' w='48%'>戻る</Button>
                <Button isLoading={loading} type="submit" colorScheme='pink' data-testid="submit" w='48%'>登録</Button>
              </Flex>
            </CardBody>
          </Card>
        </form>
      </Flex>
    </>
  );
  
};
