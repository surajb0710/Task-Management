import { db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Get all tasks from Firestore
export const getTasks = async () => {
  const querySnapshot = await getDocs(collection(db, 'tasks'));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Add a new task
export const addTask = async (task) => {
  await addDoc(collection(db, 'tasks'), task);
};
