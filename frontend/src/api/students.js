import { db } from '../firebase/firebase';

import {
  collection,
  // addDoc,
  getDocs,
  // doc,
  // getDoc,
  // query,
  // where,
} from 'firebase/firestore';

export const getStudents = async () => {
  const querySnapshot = await getDocs(collection(db, 'students'));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
