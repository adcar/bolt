import React, { useEffect, useState } from "react";
import { mountScripts } from "../api/scripts";
import { checkSignInStatus, signIn } from "../api/auth";
import { useRouter } from "next/router";
import Login from "./Login";

export default function Auth({ onLogin }) {
  const router = useRouter();
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
        console.log("Sign in failed:  " + JSON.stringify(e));
      });
  }

  function onSignIn() {
    signIn().then(onSignInSuccess);
  }

  function onSignInSuccess(googleUser) {
    onLogin(googleUser["tc"]["access_token"]);
    router.push("/dashboard");
  }

  return <Login onSignIn={onSignIn} />;
}
