import Head from "next/head";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Bolt</title>
        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>

      <h1>Login with Gmail</h1>
      <button className={""}>Login</button>
    </div>
  );
}
