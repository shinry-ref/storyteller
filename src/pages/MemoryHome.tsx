import { Box, Button, Card, CardBody, Flex, Heading, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


export const MemoryHome = () => {
  const navigate = useNavigate();

  return (
    <>
      <Flex h='100vh' justify='center' align='center' p={4} bg='gray.200' flexDirection="column">
        <Box display='block'>
        </Box>
        <Card minH='550px' w='338px' bg='white'>
          <CardBody>
            <Heading>Home</Heading>

          </CardBody>
          <Link onClick={() => navigate('/memories/register')} m={4} display='block' data-testid="register">新規登録はこちら</Link>
        </Card>
      </Flex>
    </>
  );
};
