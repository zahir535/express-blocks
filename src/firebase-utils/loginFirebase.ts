import {
  UserCredential,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../config/firebase";

interface loginFirebaseProps {
  email: string;
  password: string;
}

export const loginFirebase = ({
  email,
  password,
}: loginFirebaseProps): UserCredential | any => {
  const auth = getAuth(app);

  return signInWithEmailAndPassword(auth, email, password);
};
