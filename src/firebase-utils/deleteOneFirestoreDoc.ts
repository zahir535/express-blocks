import { collection, doc, getFirestore, deleteDoc } from "firebase/firestore";
import { app } from "../config/firebase";

interface deleteOneFirestoreDocProps<T> {
  collectionName: string;
  docId: string;
}

/**
 *
 * @param collectionName: string
 * @param docId: string
 * @returns  document id
 */
export const deleteOneFirestoreDoc = async <T>({
  collectionName,
  docId,
}: deleteOneFirestoreDocProps<T>) => {
  const db = getFirestore(app);

  try {
    const collectionRef = collection(db, collectionName);
    return deleteDoc(doc(collectionRef, docId));
  } catch (e) {
    return e;
  }
};
