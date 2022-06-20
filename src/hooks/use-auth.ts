import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import useStateStorage from "./use-state-storage";

type HandleGetCurrentUser = () => Promise<{
  userId: string;
  email: string;
  token: string;
}>;
export const useAuth = () => {
  const auth = getAuth();

  const [userData, setUserData] = useStateStorage(
    { token: "", userName: "", avatar: "" },
    "@task-persistor:user"
  );

  const handleGetCurrentUser: HandleGetCurrentUser = async () => {
    const defaultValue = { email: "", userId: "", token: "" };

    if (!auth.currentUser) return defaultValue;
    if (!auth.currentUser.email) return defaultValue;

    const { email, uid, getIdToken } = auth.currentUser;

    const token = await getIdToken();

    return { userId: uid, email, token };
  };

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result: UserCredential = await signInWithPopup(auth, provider);

    if (result.user) {
      const { displayName, photoURL } = result.user;
      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account.");
      }
    }

    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential) {
      const token = credential.accessToken;
      const user = result.user;

      setUserData({
        token: token || "",
        userName: user.displayName || "",
        avatar: user.photoURL || "",
      });
    }
  };

  return { handleSignIn, userData, handleGetCurrentUser };
};
