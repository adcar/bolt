import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { mountScripts } from "../api/scripts";
import { checkSignInStatus, signIn } from "../api/auth";
import Head from "next/head";
import dynamic from "next/dynamic";

const Login = dynamic(() => import("../components/Login"), { ssr: false });

export default function AuthPage({ onLogin }) {
  const router = useRouter();
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
        console.log("Sign in failed:  " + JSON.stringify(e));
      });
  }

  function onSignIn() {
    signIn().then(onSignInSuccess);
  }

  function onSignInSuccess(googleUser) {
    setSignIn(true);
    onLogin(googleUser["tc"]["access_token"]);
    router.push("/dashboard");
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
