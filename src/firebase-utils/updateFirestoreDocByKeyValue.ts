import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { app } from "../config/firebase";

interface updateFirestoreDocByKeyValueProps<T> {
  collectionName: string;
  docId: string;
  objectKey: string;
  updatedValue: string | boolean | number | T;
}

/**
 *
 * @param collectionName: string
 * @param docId: string
 * @param objectKey: string
 * @param updatedValue: string | boolean | number | T
 * @return promise
 */
export const updateFirestoreDocByKeyValue = async <T>({
  collectionName,
  docId,
  objectKey,
  updatedValue,
}: updateFirestoreDocByKeyValueProps<T>) => {
  const db = getFirestore(app);

  try {
    const docRef = doc(db, collectionName, docId);

    return updateDoc(docRef, {
      [objectKey]: updatedValue,
    });
  } catch (e) {
    return e;
  }
};
