import { Box, Button, Card, CardBody, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Link } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormData = {
  userId: string;
};

export const TopSearch = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    navigate(`/cards/${data.userId}`);
    setLoading(false);
  };

  return (
    <>
      <Flex h='100vh' justify='center' align='center' p={4} bg='gray.200' flexDirection="column">
        <Box display='block'>
          <Heading textAlign='center' as='h3' size='lg' mb={4}>デジタル名刺アプリ</Heading>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card minH='200px' w='338px' bg='white'>
            <CardBody>
              <FormControl mb={4} isInvalid={!!errors.userId}>
                <FormLabel>検索ID</FormLabel>
                <Input
                  {...register("userId", {
                    required: "検索したい名刺のIDを入力してください",
                    pattern: {
                      value: /^(?=.*[a-z])[a-z_]+$/,
                      message: "小文字の英語含めてください(アンダースコアも可)"
                    }
                  })} />
                <FormErrorMessage>{errors.userId?.message}</FormErrorMessage>
              </FormControl>
            </CardBody>
            <Button isLoading={loading} type="submit" colorScheme='teal' data-testid="search" mx={4} mb={4}>名刺検索</Button>
          </Card>
        </form>
        <Link onClick={() => navigate('/cards/register')} m={4} display='block'>新規登録はこちら</Link>
      </Flex>
    </>
  );
};
