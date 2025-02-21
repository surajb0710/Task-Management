import { db } from '../firebase'; // Adjust path based on your project structure
import { doc, getDoc } from 'firebase/firestore';

export const fetchUser = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.warn('No such user!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
