import React, { useState } from "react";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState("");
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
      <Component {...pageProps} onLogin={setToken} />;
    </SWRConfig>
  );
}

export default MyApp;
