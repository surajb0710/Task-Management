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

export const getMentors = async () => {
  const querySnapshot = await getDocs(collection(db, 'mentors'));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
