import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "../config/firebase";

interface saveOneFirestoreDocProps<T> {
  collectionName: string;
  docId: string;
  data: T;
}

/**
 *
 * @param collectionName: string
 * @param docId: string
 * @param data: T
 * @returns  document id
 */
export const saveOneFirestoreDoc = async <T>({
  collectionName,
  docId,
  data,
}: saveOneFirestoreDocProps<T>) => {
  const db = getFirestore(app);

  try {
    const collectionRef = collection(db, collectionName);
    return setDoc(doc(collectionRef, docId), data);
  } catch (e) {
    return e;
  }
};
