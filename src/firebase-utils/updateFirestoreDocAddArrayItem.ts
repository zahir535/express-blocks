import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { app } from "../config/firebase";

interface updateFirestoreDocAddArrayItemProps<T> {
  collectionName: string;
  docId: string;
  arrayKey: string;
  arrayItem: T[];
}

/**
 *
 * @param collectionName: string
 * @param docId: string
 * @param arrayKey: string
 * @param arrayItem: T[]
 * @return promise
 */
export const updateFirestoreDocAddArrayItem = async <T>({
  collectionName,
  docId,
  arrayKey,
  arrayItem,
}: updateFirestoreDocAddArrayItemProps<T>) => {
  const db = getFirestore(app);

  try {
    const docRef = doc(db, collectionName, docId);

    return updateDoc(docRef, {
      [arrayKey]: arrayUnion(arrayItem),
    });
  } catch (e) {
    return e;
  }
};
