import { useNavigate } from "react-router-dom";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import { Button, Card, CardBody, Flex, Heading } from "@chakra-ui/react";
export const MemoryCalendar = () => {

  const navigate = useNavigate();

  return (
    <>
      <Flex h='100vh' justify='center' align='center' p={4} bg='gray.200' flexDirection="column">
        <Card minH='500px' w='338px' bg='white' boxShadow='lg' borderRadius='md'>
          <Heading textAlign='center' as='h3' size='lg' mt={2}>カレンダー</Heading>
          <CardBody>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              locales={[jaLocale]} // 追加
              locale='ja' // 追加
              height="400px"
            />
          </CardBody>
          <Flex justify='center' mb={4}> {/* ここで中央配置 */}
            <Button
              onClick={() => navigate('/memories/home')}
              colorScheme='gray'
              bg='gray.500'
              color='white'
              w='90%'
              data-testid="back-button"
            >
              戻る
            </Button>
          </Flex>
        </Card>
      </Flex>
    </>
  );
  
};
