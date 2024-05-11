import {
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { app } from "../config/firebase";

interface registerFirebaseProps {
  email: string;
  password: string;
}

export const registerFirebase = ({
  email,
  password,
}: registerFirebaseProps): UserCredential | any => {
  const auth = getAuth(app);

  return createUserWithEmailAndPassword(auth, email, password);
};
