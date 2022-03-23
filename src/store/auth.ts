import { useEffect } from "react";
import { atom, useSetRecoilState } from "recoil";
import { firebaseAuth } from "~/infra/firebase";

interface CurrentUser {
  uid: string;
  displayName: string;
  imagePath: string;
}

export interface AuthState {
  isLoading: boolean;
  currentUser?: CurrentUser;
}

export const authState = atom<AuthState>({
  key: "authState",
  default: {
    isLoading: true
  },
  dangerouslyAllowMutability: true
});

export const AuthInit = () => {
  const setAuthState = useSetRecoilState(authState);

  useEffect(() => {
    const unSub = firebaseAuth.onAuthStateChanged(async (user) => {
      if (!user) {
        setAuthState({ isLoading: false });
        return;
      }

      try {
        const currentUser = {
          uid: user.uid,
          displayName: user.displayName || "",
          imagePath: user.photoURL || ""
        };

        setAuthState({ isLoading: false, currentUser });
      } catch (err) {
        setAuthState({ isLoading: false });
        console.error(err);
      }
    });

    return () => unSub();
  });

  return null;
};
