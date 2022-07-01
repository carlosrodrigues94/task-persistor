import { authState } from "@/state/auth/atoms";
import { loadingState } from "@/state/loading/atoms";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  browserLocalPersistence,
  setPersistence,
  signInWithCredential,
  AuthCredential,
  signInWithEmailAndPassword,
  SignInMethod,
  signOut,
  User,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import useStateStorage from "./use-state-storage";

type HandleGetCurrentUser = () => Promise<{
  userId: string;
  email: string;
  token: string;
}>;
export const useAuth = () => {
  const firebaseAuth = getAuth();
  const provider = new GoogleAuthProvider();

  const [, setLoading] = useRecoilState(loadingState);
  const [auth, setAuthState] = useRecoilState(authState);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userStorage, setUserStorage] = useStateStorage(
    { token: "", userName: "", avatar: "" },
    "@task-persistor:user"
  );

  const setOrUpdateState = async (user?: User, clean: boolean = false) => {
    if (!user && !clean) return;

    if (clean) {
      setUserStorage({
        token: "",
        userName: "",
        avatar: "",
      });
      setAuthState({
        avatar: "",
        email: "",
        id: "",
        name: "",
        refreshToken: "",
      });

      return;
    }

    if (!user) return;

    const token = await user.getIdToken();

    setUserStorage({
      token: token,
      userName: user.displayName || "",
      avatar: user.photoURL || "",
    });
    setAuthState({
      avatar: user.photoURL || "",
      email: user.email || "",
      id: user.uid || "",
      name: user.displayName || "",
      refreshToken: user.refreshToken,
    });
  };

  const handleGetCurrentUser: HandleGetCurrentUser = async () => {
    const defaultValue = { email: "", userId: "", token: "" };
    try {
      if (!firebaseAuth.currentUser) return defaultValue;
      if (!firebaseAuth.currentUser.email) return defaultValue;

      const { email, uid, getIdToken } = firebaseAuth.currentUser;

      const token = await getIdToken();

      return { userId: uid, email, token };
    } catch (err) {
      return defaultValue;
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    await setOrUpdateState(undefined, true);
    await signOut(firebaseAuth);
    setLoading(false);
  };

  const handleSignIn = async () => {
    setLoading(true);
    await setPersistence(firebaseAuth, browserLocalPersistence).then(
      async () => {
        const result = await signInWithPopup(firebaseAuth, provider);

        if (!result || !result.user) {
          setLoading(false);
          return;
        }

        const { displayName, photoURL } = result.user;

        if (!displayName || !photoURL) {
          setLoading(false);

          throw new Error("Missing information from Google Account.");
        }

        await setOrUpdateState(result.user);

        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          setLoading(false);
        }
      }
    );

    setLoading(false);
  };

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      try {
        setLoading(true);
        if (user) {
          await setPersistence(firebaseAuth, browserLocalPersistence);

          setIsAuthenticated(true);
          await setOrUpdateState(user);
          setLoading(false);

          return;
        }

        await signOut(firebaseAuth);

        setUserStorage({ avatar: "", token: "", userName: "" });

        setIsAuthenticated(false);
        setLoading(false);
      } catch (err) {}
    });
  }, [firebaseAuth]);

  return {
    handleSignIn,
    user: userStorage,
    handleGetCurrentUser,
    isAuthenticated,
    handleSignOut,
  };
};
