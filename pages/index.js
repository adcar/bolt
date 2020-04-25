import React, { useEffect } from "react";
import { mountScripts } from "../api/scripts";
import { checkSignInStatus, signIn } from "../api/auth";
import Head from "next/head";
import dynamic from "next/dynamic";

const Login = dynamic(() => import("../components/Login"), { ssr: false });

export default function Home() {
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
        console.error("Failure: " + JSON.stringify(e));
      });
  }

  function onSignIn() {
    signIn()
      .then(onSignInSuccess)
      .catch(e => {
        console.error("Failure: " + JSON.stringify(e));
      });
  }

  function onSignInSuccess(googleUser) {
    console.log("sign in success: " + JSON.stringify(googleUser));
  }

  return (
    <div className="container">
      <Head>
        <title>Bolt</title>

        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>

      <h1>Login with Gmail</h1>
      <Login onSignIn={onSignIn} />
    </div>
  );
}
