import {
  getFirestore,
  collection,
  where,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { app } from "../config/firebase";

export interface getFirestoreSnapshotProps {
  collectionName: string;
  objectKey: string;
  keyCondition: string | boolean | number;
  orderByKey?: string;
  orderArrangement?: "asc" | "desc";
  docLimit?: number;
}

/**
 *
 * @param collectionName: string
 * @param objectKey: string
 * @param keyCondition: string | boolean | number
 * @param orderByKey?: string
 * @param orderArrangement?: "asc" | "desc"
 * @param docLimit?: number
 * @returns array of {docId, docData}
 */
export const getFirestoreSnapshot = async ({
  collectionName,
  objectKey,
  keyCondition,
  orderByKey,
  orderArrangement = "asc",
  docLimit = 50,
}: getFirestoreSnapshotProps) => {
  const db = getFirestore(app);

  try {
    const snapShotData: any[] = [];
    const collectionRef = collection(db, collectionName);

    // todo - orderBy("timeStamp") will throw an error
    const q = query(
      collectionRef,
      where(objectKey, "==", keyCondition),
      orderBy(orderByKey ? orderByKey : objectKey, orderArrangement),
      limit(docLimit)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      snapShotData.push({ docId: doc.id, docData: doc.data() });
    });

    return snapShotData;
  } catch (e) {
    return e;
  }
};
