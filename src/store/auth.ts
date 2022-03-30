import { useContext, useEffect } from "react";
import { atom, useSetRecoilState } from "recoil";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, firebaseAuth } from "~/infra/firebase";
import { ApiContext } from "~/context/ApiContext";

export interface CurrentUser {
  uid: string;
  displayName: string;
  imagePath: string;
  subscriptionStatus:
    | "incomplete"
    | "incomplete_expired"
    | "trialing"
    | "active"
    | "past_due"
    | "canceled"
    | "unpaid";
  stripeCustomerId: string;
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
  const { stripeApi } = useContext(ApiContext);

  useEffect(() => {
    const unSub = firebaseAuth.onAuthStateChanged(async (user) => {
      if (!user) {
        setAuthState({ isLoading: false });
        return;
      }

      let currentUser: CurrentUser = {
        uid: user.uid,
        displayName: user.displayName || "",
        imagePath: user.photoURL || "",
        subscriptionStatus: "incomplete",
        stripeCustomerId: ""
      };

      try {
        const docRef = await getDoc(doc(db, "user", currentUser.uid));

        if (!docRef.data()) {
          const res = await stripeApi.createStripeUser(currentUser);
          const { customer } = await res.json();

          await setDoc(doc(db, "user", currentUser.uid), {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            imagePath: currentUser.imagePath,
            subscriptionStatus: currentUser.subscriptionStatus,
            stripeCustomerId: customer.id
          });

          return setAuthState({ isLoading: false, currentUser });
        }

        currentUser = {
          uid: docRef.data()?.uid,
          displayName: docRef.data()?.displayName || "",
          imagePath: docRef.data()?.imagePath || "",
          subscriptionStatus: docRef.data()?.subscriptionStatus,
          stripeCustomerId: docRef.data()?.stripeCustomerId
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
