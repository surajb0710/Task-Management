import { db } from '../firebase/firebase';

import {
  collection,
  addDoc,
  // getDocs,
  // doc,
  // getDoc,
  // query,
  // where,
} from 'firebase/firestore';

export const addMentor = async (mentor) => {
  await addDoc(collection(db, 'mentors'), mentor);
};
