import { useEffect, useState } from 'react';
// import io from 'socket.io-client';
import { sendMessage } from '../utils/chatUtils';
import PropTypes from 'prop-types';
import { fetchMessages } from '../api';

// const socket = io('http://localhost:5001'); // Replace with your backend URL

const ChatComponent = ({ chatId, userId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  // const [currentUser, setCurrentUser] = useState({});

  console.log('------ChatComponent------chatId-----------', chatId);
  console.log('------ChatComponent------userId-----------', userId);
  console.log('------ChatComponent------receiverId-----------', receiverId);

  useEffect(() => {
    if (!chatId) return;

    console.log(`📡 Subscribing to chat messages for chatId: ${chatId}`);

    const unsubscribe = fetchMessages(chatId, setMessages);

    return () => {
      console.log(`📴 Unsubscribing from chat messages for chatId: ${chatId}`);
      unsubscribe();
    };
  }, [chatId]);

  const handleSend = async () => {
    if (!input.trim()) return;

    await sendMessage(chatId, userId, receiverId, input);

    setInput(''); // Clear input field
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index} className="flex">
            <p className={msg.senderId === userId ? 'sent' : 'received'}>
              {msg.text}
            </p>
            {/* <div>
              <p>sender : {currentUser.name}</p>
              <p>receiver : {receiver.name}</p>
            </div> */}
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
