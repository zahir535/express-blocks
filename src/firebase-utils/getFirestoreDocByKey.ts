import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../config/firebase";

interface getFirestoreDocByKeyProps {
  collectionName: string;
  docId: string;
}

/**
 *
 * @param collectionName: string
 * @param docId: string
 * @returns firestore doc
 */
export const getFirestoreDocByKey = async ({
  collectionName,
  docId,
}: getFirestoreDocByKeyProps) => {
  const db = getFirestore(app);

  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      return undefined;
    }
  } catch (e) {
    return e;
  }
};
