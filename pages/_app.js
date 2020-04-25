import React, { useEffect, useState } from "react";
import { SWRConfig } from "swr";
import Head from "next/head";
import { useRouter } from "next/router";
import { checkSignInStatus } from "../api/auth";
import "../styles/vars.css";

function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState("");
  const router = useRouter();
  useEffect(() => {
    init();
  }, []);

  function init() {
    gapi.load("client:auth2", initClient);
  }

  function initClient() {
    checkSignInStatus()
      .then(onSignInSuccess)
      .catch(() => {
        router.push("/");
      });
  }

  function onSignInSuccess(googleUser) {
    setToken(googleUser["tc"]["access_token"]);
    router.push("/dashboard");
  }

  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: url =>
          fetch(url, {
            headers: new Headers({
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            })
          }).then(res => res.json())
      }}
    >
      <Head>
        <title>Bolt</title>
        <script src="https://apis.google.com/js/api.js" />
      </Head>

      <Component
        {...pageProps}
        onSignIn={setToken}
        onSignOut={setToken}
        token={token}
      />
    </SWRConfig>
  );
}

export default MyApp;
