import { useEffect } from "react";
import { atom, useSetRecoilState } from "recoil";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, firebaseAuth } from "~/infra/firebase";

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

      const currentUser = {
        uid: user.uid,
        displayName: user.displayName || "",
        imagePath: user.photoURL || ""
      };

      try {
        const docRef = await getDoc(doc(db, "user", currentUser.uid));

        if (!docRef.data()) {
          await setDoc(doc(db, "user", currentUser.uid), {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            imagePath: currentUser.imagePath
          });
        }

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
