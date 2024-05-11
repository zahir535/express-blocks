import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  startAt,
} from "firebase/firestore";
import { app } from "../config/firebase";

export interface getFirestoreSnapshotPaginatedProps {
  collectionName: string;
  page: number;
  orderByObjectKey?: string;
  orderArrangement?: "asc" | "desc";
  docLimit?: number;
}

/**
 *
 * @param collectionName: string
 * @param page: number
 * @param orderByObjectKey?: string
 * @param orderArrangement?: "asc" | "desc"
 * @param docLimit?: number
 * @returns array of {docId, docData}
 */
export const getFirestoreSnapshotPaginated = async ({
  collectionName,
  page,
  orderByObjectKey = "",
  orderArrangement = "asc",
  docLimit = 50,
}: getFirestoreSnapshotPaginatedProps) => {
  const db = getFirestore(app);

  try {
    const snapShotData: any[] = [];
    const collectionRef = collection(db, collectionName);

    // m2
    // const nextIndex = page !== 1 ? 1 : 0;
    // const startingDoc = (page - 1) * docLimit + nextIndex;
    // const startingDoc = (page - 1) * docLimit;

    // Construct a new query starting at this document
    // const q = query(
    //   collectionRef,
    //   orderBy(orderByObjectKey, orderArrangement),
    //   startAt(startingDoc),
    //   limit(docLimit)
    // );

    const q = query(
      collectionRef,
      orderBy(orderByObjectKey),
      startAt(0),
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
