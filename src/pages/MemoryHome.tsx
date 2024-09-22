import { Box, Button, Card, CardBody, Flex, Heading, Link, Stack, Tag } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteStory, getStories } from "../utils/supabaseFunction";
import { story } from "../types/stories";
import { MdVisibility, MdDelete } from 'react-icons/md';


export const MemoryHome = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState<story[]>();

  useEffect(() => {
    const getUserRecord = async () =>{
      try {
        const newStories = await getStories();
        setStories(newStories);
      } catch (error){
        console.error("Failed to fetch records:", error);
      }
    }
    getUserRecord();
  }, []);

  const onClickDetail = (id: number) => {
    navigate(`/memories/${id}`);
  }

  const onClickDelete = async (id: number) => {
    try {
      const deletedStory = await DeleteStory(id);
      const newStories = await getStories();
      setStories(newStories);
      console.log('Deleted story:', deletedStory);
    } catch (error) {
      console.error('Error deleting story:', error);
    }
  }
  

  return (
    <>
      <Flex h='100vh' justify='center' align='center' p={4} bg='gray.200' flexDirection="column">
        <Card minH='550px' w='338px' bgGradient="linear(to-r, blue.50, blue.100)" boxShadow='lg' borderRadius='md'>
          <CardBody>
            {/* Header inside the card */}
            <Flex justify='space-around' borderRadius='md' mb={4}>
              <Link href='/memories/register' color="black" fontWeight="bold" mr={1} onClick={() => navigate('/memories/register')} textDecoration="underline" _hover={{ color: 'teal.500' }}>新規登録</Link>
              <Link href='/memories/calendar' color="black" fontWeight="bold" mr={1} textDecoration="underline" _hover={{ color: 'teal.500' }}>カレンダー</Link>
              <Link href='/time-capsule' color="black" fontWeight="bold" textDecoration="underline" _hover={{ color: 'teal.500' }}>タイムカプセル</Link>
            </Flex>
            
            {/* Title for the stories section */}
            <Heading textAlign="center" mb={4} as='h4' size='md' color="black">思い出を物語にしよう</Heading>
            <Stack spacing={4} mt={4}>
              {stories?.map((story) => (
                <Box key={story.id} p={4} borderWidth={1} borderRadius="md" bg="white">
                  <Heading size="sm" mb={2}>{story.title}</Heading>
                  <Flex align="center" mb={2}>
                    <Tag colorScheme="blue" variant="solid">{story.category_name}</Tag>
                  </Flex>
                  
                  <Flex justify='flex-end' mt={2}>
                    <Stack direction='row' spacing={4}>
                      <Button onClick={() => onClickDetail(story.id)} colorScheme='teal' leftIcon={<MdVisibility />}>
                        詳細
                      </Button>
                      <Button colorScheme='red' onClick={() => onClickDelete(story.id)} leftIcon={<MdDelete />}>
                        削除
                      </Button>
                    </Stack>
                  </Flex>
                </Box>
              ))}
            </Stack>
          </CardBody>
        </Card>
      </Flex>
    </>
  );  
};
