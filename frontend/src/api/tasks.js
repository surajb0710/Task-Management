import { db } from '../firebase/firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from 'firebase/firestore';

export const addTask = async (task) => {
  await addDoc(collection(db, 'tasks'), task);
};

export const getTasks = async () => {
  const querySnapshot = await getDocs(collection(db, 'tasks'));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getTaskById = async (taskId) => {
  const taskRef = doc(db, 'tasks', taskId); // Reference to specific task
  const taskSnap = await getDoc(taskRef); // Fetch the task document

  if (taskSnap.exists()) {
    return { id: taskSnap.id, ...taskSnap.data() }; // Return task with ID
  } else {
    return null; // Return null if task doesn't exist
  }
};

export const getTasksByMentorId = async (mentorId) => {
  const q = query(
    collection(db, 'tasks'),
    where('mentors', 'array-contains', mentorId)
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getTasksByDueDate = async (dueDate) => {
  const q = query(collection(db, 'tasks'), where('dueDate', '==', dueDate));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getTasksCreatedBetweenDates = async (startDate, endDate) => {
  const q = query(
    collection(db, 'tasks'),
    where('createdAt', '>=', startDate),
    where('createdAt', '<=', endDate)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
