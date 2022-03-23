import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import type { NextPage } from "next";
import { useRecoilValue } from "recoil";
import { firebaseAuth } from "~/infra/firebase";
import { authState } from "~/store/auth";

const Home: NextPage = (): JSX.Element => {
  const { currentUser, isLoading } = useRecoilValue(authState);

  const signUp = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(firebaseAuth, provider);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <p>now loading...</p>;

  return (
    // <form action="/api/stripeCheckOut" method="POST">
    //   {/* <section>
    //     <button type="submit" role="link">
    //       支払う
    //     </button>
    //   </section> */}
    // </form>
    <main>
      {currentUser ? (
        <div>
          <p>id: {currentUser.uid}</p>
          <p>userName: {currentUser.displayName}</p>
          <img src={currentUser.imagePath} alt={currentUser.displayName} />
        </div>
      ) : (
        <button onClick={signUp}>ログイン</button>
      )}
    </main>
  );
};

export default Home;
