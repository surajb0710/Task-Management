import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { sendMessage as saveMessageToFirestore } from '../utils/chatUtils';
import PropTypes from 'prop-types';
import { fetchMessages, getUserById } from '../api';

const socket = io('http://localhost:5001'); // Replace with your backend URL

const ChatComponent = ({ chatId, userId, receiverId, receiver }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [currentUser, setCurrentUser] = useState({});

  console.log('------ChatComponent------chatId-----------', chatId);
  console.log('------ChatComponent------userId-----------', userId);
  console.log('------ChatComponent------receiverId-----------', receiverId);

  useEffect(() => {
    if (!chatId) return;

    console.log(`🔄 Fetching messages for chat: ${chatId}`);

    // Fetch messages from Firestore (real-time listener)
    const unsubscribe = fetchMessages(chatId, setMessages);

    // Join chat room for real-time messages
    socket.emit('join', chatId);

    // Listen for messages sent by the other user
    socket.on('receiveMessage', (message) => {
      if (message.senderId !== userId) {
        console.log('📩 New message from receiver:', message);
        setMessages((prev) => [...prev, message]); // Only update for received messages
      }
    });

    return () => {
      unsubscribe(); // Unsubscribe Firestore listener
      socket.off('receiveMessage'); // Remove Socket.io listener
    };
  }, [chatId, userId]);

  useEffect(() => {
    const fetchCurrentUser = async (userId) => {
      const currentUser = await getUserById(userId);
      setCurrentUser(currentUser);
    };

    fetchCurrentUser(userId);
  }, [userId]);

  console.log('-------currentUser-----', currentUser);

  const handleSend = async () => {
    if (!input.trim()) return;

    const message = { chatId, senderId: userId, receiverId, text: input };
    await saveMessageToFirestore(chatId, userId, receiverId, input);

    socket.emit('sendMessage', message);

    setMessages((prev) => [...prev, message]);
    setInput('');
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index} className="flex">
            <p className={msg.senderId === userId ? 'sent' : 'received'}>
              {msg.text}
            </p>
            <div>
              <p>sender : {currentUser.name}</p>
              <p>receiver : {receiver.name}</p>
            </div>
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

ChatComponent.propTypes = {
  chatId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  receiverId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  receiver: PropTypes.object.isRequired,
};

export default ChatComponent;
