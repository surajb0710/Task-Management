import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const fetchMessages = (chatId, setMessages) => {
  if (!chatId) {
    console.log('❌ No chatId provided.');
    return;
  }

  const messagesRef = collection(db, `chats/${chatId}/messages`);
  const q = query(messagesRef, orderBy('timestamp', 'asc')); // Fetch in order

  return onSnapshot(q, (snapshot) => {
    const fetchedMessages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log('📥 Loaded messages from Firestore:', fetchedMessages);
    setMessages(fetchedMessages);
  });
};
