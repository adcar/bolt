import React, { useEffect, useState } from "react";
import { mountScripts } from "../api/scripts";
import { checkSignInStatus, signIn } from "../api/auth";
import Head from "next/head";
import dynamic from "next/dynamic";

const Login = dynamic(() => import("../components/Login"), { ssr: false });

export default function Home({ onLogin }) {
  const [isSignedIn, setSignIn] = useState(false);
  useEffect(() => {
    mountScripts().then(init);
  }, []);

  function init() {
    window.gapi.load("client:auth2", initClient);
  }

  function initClient() {
    checkSignInStatus()
      .then(onSignInSuccess)
      .catch(e => {
        setSignIn(false);
        console.log("Sign in:  " + JSON.stringify(e));
      });
  }

  function onSignIn() {
    signIn().then(onSignInSuccess);
  }

  function onSignInSuccess(googleUser) {
    console.log(
      "sign in success: " + JSON.stringify(googleUser["tc"]["access_token"])
    );
    setSignIn(true);
    onLogin(googleUser["tc"]["access_token"]);
  }

  return (
    <div className="container">
      <Head>
        <title>Bolt</title>

        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>
      Logged in? {JSON.stringify(isSignedIn)}
      <Login onSignIn={onSignIn} isSignedIn={isSignedIn} />
    </div>
  );
}
