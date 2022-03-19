import type { NextPage } from "next";

const Home: NextPage = (): JSX.Element => {
  return (
    <form action="/api/stripeCheckOut" method="POST">
      <section>
        <button type="submit" role="link">
          支払う
        </button>
      </section>
    </form>
  );
};

export default Home;
