import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getChat, createChat } from '../../utils/chatUtils'; // Helper functions
import ChatComponent from '../ChatComponent';
import PropTypes from 'prop-types';

const Messages = ({ receiverId }) => {
  const auth = getAuth();
  const userId = auth.currentUser ? auth.currentUser.uid : null;
  const [chatId, setChatId] = useState(null);

  useEffect(() => {
    const loadChat = async () => {
      console.log('🔍 Checking for existing chat between:', userId, receiverId);

      let chat = await getChat(userId, receiverId);
      console.log('📌 Chat ID received:', chat);

      if (!chat) {
        console.log('⚠️ No chat found. Creating a new one...');
        chat = await createChat(userId, receiverId);
        console.log('🆕 New Chat ID:', chat);
      }

      setChatId(chat);
    };

    loadChat();
  }, [userId, receiverId]);

  console.log('--userId---', userId);
  console.log('--receiverId---', receiverId);
  console.log('--chatId---', chatId);

  if (!userId || !receiverId || !chatId) return <p>Loading chat...</p>;

  return (
    <ChatComponent chatId={chatId} userId={userId} receiverId={receiverId} />
  );
};

Messages.propTypes = {
  receiverId: PropTypes.string.isRequired,
};

export default Messages;
