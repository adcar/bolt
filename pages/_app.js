import React, { useEffect, useState } from "react";
import { SWRConfig } from "swr";
import Head from "next/head";
import { useRouter } from "next/router";
import { checkSignInStatus } from "../api/auth";
import "../styles/vars.css";

function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState("");
  const [emails, setEmails] = useState(null);
  const router = useRouter();
  console.log(emails);
  useEffect(() => {
    init();
  }, []);

  function init() {
    gapi.load("client:auth2", initClient);
  }

  function initClient() {
    console.log("Init client");
    checkSignInStatus()
      .then(onSignInSuccess)
      .catch(() => {
        router.push("/");
      });
  }

  function onSignInSuccess(googleUser) {
    setToken(googleUser["tc"]["access_token"]);
    if (router.pathname === "/") {
      router.push("/dashboard");
    }
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
        setEmails={emails => {
          setEmails(emails);
          localStorage.setItem("emails", JSON.stringify(emails));
        }}
        emails={emails}
      />
    </SWRConfig>
  );
}

export default MyApp;
