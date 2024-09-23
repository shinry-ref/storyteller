import { Box, Button, Card, CardBody, Flex, Heading, Link, Spinner, Stack, Tag, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteStory, getStories, getUser } from "../utils/supabaseFunction";
import { story } from "../types/stories";
import { MdVisibility, MdDelete } from 'react-icons/md';
import { User } from "../types/user";
import { FaUserCircle } from "react-icons/fa";

export const MemoryHome = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState<story[]>([]);
  const [latestStories, setLatestStories] = useState<story[]>([]);
  const [user, setUser] = useState<User>();
  const [randomStory, setRandomStory] = useState<story | null>(null);
  const [isLoading, setIsLoading] = useState(true); // ローディング状態を管理

  useEffect(() => {
    const getUserRecord = async () => {
      try {
        const newStories = await getStories();

        const sortedStories = newStories.sort((a, b) => {
          return new Date(b.story_date).getTime() - new Date(a.story_date).getTime();
        });
        const newUser = await getUser(1);
        const newlatestStories = sortedStories.slice(0, 2);
        setLatestStories(newlatestStories); // 最新の3件を取得
        setStories(sortedStories);
        setRandomStory(getRandomStory(sortedStories.filter(story => !newlatestStories.includes(story))));
        setUser(newUser);
      } catch (error) {
        console.error("Failed to fetch records:", error);
      } finally {
        setIsLoading(false); // データ取得後にローディング終了
      }
    };
    getUserRecord();
  }, []);

  const onClickDetail = (id: number) => {
    navigate(`/memories/${id}`);
  };

  const onClickDelete = async (id: number) => {
    try {
      setIsLoading(true); // 削除時もローディングを開始
      await DeleteStory(id);
      const newStories = await getStories();
      const sortedStories = newStories.sort((a, b) => {
        return new Date(b.story_date).getTime() - new Date(a.story_date).getTime();
      });

      const newlatestStories = sortedStories.slice(0, 2);
      setLatestStories(newlatestStories);
      setStories(sortedStories);
      setRandomStory(getRandomStory(sortedStories.filter(story => !newlatestStories.includes(story))));
    } catch (error) {
      console.error('Error deleting story:', error);
    } finally {
      setIsLoading(false); // 削除完了後にローディング終了
    }
  };

  const getRandomStory = (stories: story[]) => {
    if (stories.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * stories.length);
    return stories[randomIndex];
  };

  return (
    <>
      <Flex h='100vh' justify='center' align='center' p={4} bg='gray.200' flexDirection="column">
        <Card minH='550px' w='338px' bgGradient="linear(to-r, blue.50, blue.100)" boxShadow='lg' borderRadius='md'>
          <CardBody>
            <Flex justify='space-around' borderRadius='md' mb={4}>
              <Link href='/memories/register' color="black" fontWeight="bold" mr={1} onClick={() => navigate('/memories/register')} textDecoration="underline" _hover={{ color: 'teal.500' }}>新規登録</Link>
              <Link href='/memories/calendar' color="black" fontWeight="bold" mr={1} textDecoration="underline" _hover={{ color: 'teal.500' }}>カレンダー</Link>
            </Flex>
            <Flex align="center" mb={4}>
              <FaUserCircle size={24} />
              <Text ml={2} fontWeight="bold">{user?.name}</Text>
            </Flex>

            {/* ローディング中かどうかの確認 */}
            {isLoading ? (
              <Flex justify='center' align='center' h='300px'>
                <Spinner size="xl" /> {/* Chakra UI のスピナー */}
              </Flex>
            ) : (
              <>
                <Heading textAlign="center" mb={4} as='h4' size='md' color="black">思い出を物語にしよう</Heading>
                <Stack spacing={4} mt={4}>
                  {randomStory && (
                    <Box p={4} borderWidth={1} borderRadius="md" bg="pink.100" mb={4}>
                      あの日の思い出
                      <Heading size="sm" mb={2}>{randomStory.title}（{randomStory?.story_date ? new Date(randomStory.story_date).toLocaleDateString() : '日付未設定'}）</Heading>
                      <Flex align="center" mb={2}>
                        <Tag colorScheme="blue" variant="solid">{randomStory.category_name}</Tag>
                      </Flex>
                      <Flex justify='flex-end' mt={2}>
                        <Stack direction='row' spacing={4}>
                          <Button onClick={() => onClickDetail(randomStory.id)} colorScheme='teal' leftIcon={<MdVisibility />}>
                            詳細
                          </Button>
                          <Button colorScheme='red' onClick={() => onClickDelete(randomStory.id)} leftIcon={<MdDelete />}>
                            削除
                          </Button>
                        </Stack>
                      </Flex>
                    </Box>
                  )}

                  {latestStories.map((story) => (
                    <Box key={story.id} p={4} borderWidth={1} borderRadius="md" bg="white">
                      <Heading size="sm" mb={2}>{story.title}（{story?.story_date ? new Date(story.story_date).toLocaleDateString() : '日付未設定'}）</Heading>
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
                {stories.length >= 3 && (
                  <Link href="/memories/all" color="blue.500" mt={4} textAlign="center" display="block">
                    もっと見る
                  </Link>
                )}
              </>
            )}
          </CardBody>
        </Card>
      </Flex>
    </>
  );
};
