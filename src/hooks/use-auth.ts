import { authState } from "@/state/auth/atoms";
import { loadingState } from "@/state/loading/atoms";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  browserLocalPersistence,
  setPersistence,
  User,
} from "firebase/auth";
import { useState } from "react";
import { useRecoilState } from "recoil";
import useStateStorage from "./use-state-storage";

type HandleGetCurrentUser = () => Promise<{
  userId: string;
  email: string;
  token: string;
}>;
export const useAuth = () => {
  const firebaseAuth = getAuth();
  const [, setLoading] = useRecoilState(loadingState);
  const [auth, setAuthState] = useRecoilState(authState);

  const [userData, setUserData] = useStateStorage(
    { token: "", userName: "", avatar: "" },
    "@task-persistor:user"
  );

  const handleGetCurrentUser: HandleGetCurrentUser = async () => {
    const defaultValue = { email: "", userId: "", token: "" };

    if (!firebaseAuth.currentUser) return defaultValue;
    if (!firebaseAuth.currentUser.email) return defaultValue;

    const { email, uid, getIdToken } = firebaseAuth.currentUser;

    const token = await getIdToken();

    return { userId: uid, email, token };
  };

  const handleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    await setPersistence(firebaseAuth, browserLocalPersistence).then(
      async () => {
        const result = await signInWithPopup(firebaseAuth, provider);

        if (!result.user) return;

        const { email, displayName, photoURL, uid, refreshToken } = result.user;

        if (!displayName || !photoURL) {
          setLoading(false);

          throw new Error("Missing information from Google Account.");
        }
        setAuthState({
          avatar: photoURL || "",
          name: displayName || "",
          email: email || "",
          id: uid || "",
          refreshToken: refreshToken,
        });

        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
          const user = result.user;

          setUserData({
            token: token || "",
            userName: user.displayName || "",
            avatar: user.photoURL || "",
          });
          setLoading(false);
        }
      }
    );

    setLoading(false);
  };

  return { handleSignIn, user: userData, handleGetCurrentUser };
};
