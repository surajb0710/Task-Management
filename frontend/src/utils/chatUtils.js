import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  onSnapshot,
  // serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

// Function to get existing chat between two users
export const getChat = async (userId, receiverId) => {
  const chatsRef = collection(db, 'chats');
  const q = query(chatsRef, where('participants', 'array-contains', userId));
  const querySnapshot = await getDocs(q);

  for (let doc of querySnapshot.docs) {
    const chatData = doc.data();
    if (chatData.participants.includes(receiverId)) {
      return doc.id; // Return existing chatId
    }
  }
  return null;
};

// Function to create a new chat if it doesn't exist
export const createChat = async (userId, receiverId) => {
  if (!userId || !receiverId) {
    console.log('❌ Missing userId or receiverId in createChat');
    return null;
  }

  try {
    const chatsRef = collection(db, 'chats');
    const newChat = await addDoc(chatsRef, {
      participants: [userId, receiverId],
      createdAt: new Date(),
    });

    console.log('✅ Chat created successfully with ID:', newChat.id);
    return newChat.id;
  } catch (error) {
    console.error('🔥 Error creating chat:', error);
    return null;
  }
};

// Function to send a message
export const sendMessage = async (chatId, senderId, receiverId, text) => {
  if (!chatId || !senderId || !text.trim()) {
    console.log('❌ Missing data in sendMessage');
    return;
  }

  try {
    const messageData = {
      senderId,
      text,
      receiverId,
      timestamp: new Date(),
    };

    console.log('📝 Writing message to Firestore:', messageData);

    const messagesRef = collection(db, `chats/${chatId}/messages`);
    const docRef = await addDoc(messagesRef, messageData);

    console.log(`✅ Message sent successfully. Message ID: ${docRef.id}`);
  } catch (error) {
    console.error('🔥 Error sending message:', error);
  }
};

export const fetchMessages = (chatId, setMessages) => {
  if (!chatId) {
    console.error('❌ No chatId provided.');
    return;
  }

  const messagesRef = collection(db, `chats/${chatId}/messages`);
  const q = query(messagesRef, orderBy('timestamp', 'asc'));

  return onSnapshot(q, (snapshot) => {
    const fetchedMessages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log('📥 Firestore updated messages:', fetchedMessages);
    setMessages(fetchedMessages);
  });
};
