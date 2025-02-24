import { persons } from '../../assets/assets.js';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getChat, createChat } from '../../utils/chatUtils';
import PropTypes from 'prop-types';
import ChatComponent from '../ChatComponent.jsx';

const MessageInbox = ({ receiver }) => {
  const auth = getAuth();
  const userId = auth.currentUser ? auth.currentUser.uid : null;
  const user = auth.currentUser;
  const [chatId, setChatId] = useState(null);

  console.log('------Current User-----', user);

  useEffect(() => {
    const loadChat = async () => {
      console.log(
        '🔍 Checking for existing chat between:',
        userId,
        receiver.id
      );

      let chat = await getChat(userId, receiver.id);
      console.log('📌 Chat ID received:', chat);

      if (!chat) {
        console.log('⚠️ No chat found. Creating a new one...');
        chat = await createChat(userId, receiver.id);
        console.log('🆕 New Chat ID:', chat);
      }

      setChatId(chat);
    };

    loadChat();
  }, [userId, receiver]);

  return (
    <div className="flex flex-col">
      <div className="flex pl-12 pr-8 py-6 justify-between">
        <div className="flex gap-3">
          <img
            src={persons.person1}
            alt=""
            className="w-13 h-13 rounded-full"
          />
          <div className="flex flex-col gap-2 grow">
            <p className="text-sm font-semibold text-[#141522]">
              {receiver.name}
            </p>
            <div className="flex gap-3 items-center">
              <div className="rounded-full bg-[#25C78B] w-2 h-2"></div>
              <p className="text-sm text-[#141522]">Online</p>
            </div>
          </div>
        </div>
        <div className="flex gap-6 items-center">
          <div className="w-13 h-13 flex justify-center items-center">
            <VideocamOutlinedIcon style={{ color: '#8E92BC' }} />
          </div>
          <div className="w-13 h-13 flex justify-center items-center">
            <PhoneOutlinedIcon style={{ color: '#8E92BC' }} />
          </div>
        </div>
      </div>
      <div className="grow-1">
        <ChatComponent
          chatId={chatId}
          userId={userId}
          receiverId={receiver.id}
          receiver={receiver}
          user={user}
        />
      </div>
    </div>
  );
};

MessageInbox.propTypes = {
  receiver: PropTypes.object.isRequired,
};

export default MessageInbox;
