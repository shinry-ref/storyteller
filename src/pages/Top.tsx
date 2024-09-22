import { Box, Card, CardBody, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


export const Top = () => {
  const navigate = useNavigate();

  return (
    <>
      <Flex h='100vh' justify='center' align='center' p={4} bg='gray.200' flexDirection="column">
        <Box display='block'>
          {/* 必要であれば、ここに追加のコンテンツを入れることができます */}
        </Box>
        <Card minH='550px' w='338px' bgGradient="linear(to-r, blue.200, blue.300)" boxShadow='md' borderRadius='md'>
          <CardBody display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Heading color="white" textAlign="center">Memory teller</Heading>
            <Text color="white" fontSize="md" textAlign="center" mb={4}>思い出を記録</Text> {/* サブタイトルを追加 */}
            <Link 
              onClick={() => navigate('/memories/home')} 
              m={4} 
              display='block' 
              color="white" 
              fontWeight="bold" 
              textAlign="center" 
              textDecoration="underline" 
              fontSize="lg" 
              _hover={{ color: "yellow.400", textDecoration: "none" }} 
              data-testid="register"
            >
              My Memoryへ
            </Link>
          </CardBody>
        </Card>
      </Flex>
    </>
  );  
};
