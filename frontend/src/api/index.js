import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const getAllUsers = async () => {
  const studentsSnapshot = await getDocs(collection(db, 'students'));
  const mentorsSnapshot = await getDocs(collection(db, 'mentors'));

  const students = studentsSnapshot.docs.map((doc) => ({
    id: doc.id,
    role: 'student',
    ...doc.data(),
  }));

  const mentors = mentorsSnapshot.docs.map((doc) => ({
    id: doc.id,
    role: 'mentor',
    ...doc.data(),
  }));

  return [...students, ...mentors];
};

export const getAllUsersExceptCurrent = async () => {
  const auth = getAuth();

  const userId = auth.currentUser ? auth.currentUser.uid : null;

  const allUsers = await getAllUsers();

  const updatedAllUsers = allUsers.filter((user) => user.id !== userId);

  return updatedAllUsers;
};

export const getUserById = async (userId) => {
  const allUsers = await getAllUsers();
  return allUsers.find((user) => user.id === userId) || null;
};

export * from './mentors';
export * from './tasks';
export * from './students';
export * from './chats';
