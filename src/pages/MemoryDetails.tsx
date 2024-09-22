import { Box, Button, Card, CardBody, Center, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { story } from "../types/stories";
import { getStory } from "../utils/supabaseFunction";

export const MemoryDetails = () => {
  const { id } = useParams();
  // const [user, setUser] = useState<User>();
  // const [skills, setSkills] = useState<Skill[]>();
  const [story, setStory] = useState<story>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllNameCard = async () =>{
      setLoading(true);
      try {
        if (id !== undefined) {
          const numericId = parseInt(id, 10);
          
          if (!isNaN(numericId)) {
            const newStory = await getStory(numericId);
            console.log(newStory)
            setStory(newStory);
          } else {
            console.error('ID is not a valid number');
            navigate('/error'); 
          }
        } else {
          console.error('ID is undefined');
          navigate('/error');
        }
      } catch (error){
        console.error("error:", error);
      } finally {
        setLoading(false);
      }
    }
    getAllNameCard();
  }, [id]);

  const removeMarkdownSyntax = (text: string) => {
    return text.replace(/```html/g, '').replace(/```/g, '').replace(/`/g, '').trim();
  };

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner data-testid="spinner" />
        </Center>
      ) : (
        <Flex h='100vh' justify='center' align='center' p={4} bg='gray.200' flexDirection="column">
          <Card minH='500px' w='338px' bg='white' boxShadow='lg' borderRadius='md'>
            <CardBody>
              <Heading textAlign='center' as='h3' size='lg' mb={4} data-testid="name">
                {story?.title}（{story?.story_date ? new Date(story.story_date).toLocaleDateString() : '日付未設定'}）
              </Heading>
              <Box>
                <Text textAlign='center'>カテゴリ</Text>
                <Box height="1px" backgroundColor="gray.300" mb={2} />
                <Box bg='cyan.50' p={2} mb={4} borderRadius={4} data-testid="description">
                  {story?.category_name}
                </Box>
              </Box>
              <Box>
                <Text textAlign='center'>内容</Text>
                <Box height="1px" backgroundColor="gray.300" mb={2} />
                <Box 
                  bg='cyan.50' 
                  p={2} 
                  mb={4} 
                  borderRadius={4} 
                  textAlign='center' 
                  data-testid="skill" 
                  dangerouslySetInnerHTML={{ __html: removeMarkdownSyntax(story?.ai_content || '') }} 
                  maxH='250px' // 最大高さを設定
                  overflowY='auto' // スクロールを可能に
                />
              </Box>
              <Button
                onClick={() => navigate('/memories/home')}
                colorScheme='gray'
                bg='gray.500'
                color='white'
                w='100%'
                mt={4}
                data-testid="back-button"
              >
                戻る
              </Button>
            </CardBody>
          </Card>
        </Flex>
      )}
    </>
  );
  
};
