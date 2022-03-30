import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import type { NextPage } from "next";
import { useContext } from "react";
import { useRecoilValue } from "recoil";
import { ApiContext } from "~/context/ApiContext";
import { firebaseAuth } from "~/infra/firebase";
import { authState } from "~/store/auth";

const Home: NextPage = (): JSX.Element => {
  const { currentUser, isLoading } = useRecoilValue(authState);
  const { stripeApi } = useContext(ApiContext);

  const signUp = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(firebaseAuth, provider);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClick = async () => {
    try {
      if (!currentUser) throw new Error();

      const res = await stripeApi.checkOutForStripe(
        currentUser.stripeCustomerId
      );

      const stripeCheckOutSession = await res.json();

      location.href = stripeCheckOutSession.url;
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <p>now loading...</p>;

  return (
    <main>
      {currentUser ? (
        <div>
          <p>id: {currentUser.uid}</p>
          <p>userName: {currentUser.displayName}</p>
          <p>status: {currentUser.subscriptionStatus}</p>
          <img src={currentUser.imagePath} alt={currentUser.displayName} />
          {currentUser.subscriptionStatus === "active" ? (
            <p>あなたは有料会員です</p>
          ) : (
            <button onClick={handleClick}>運命のボタンだぜ</button>
          )}
        </div>
      ) : (
        <button onClick={signUp}>ログイン</button>
      )}
    </main>
  );
};

export default Home;
