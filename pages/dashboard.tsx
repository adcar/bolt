import React, { useEffect, useState } from "react";
import SignOut from "../components/SignOut";
import { getMessages } from "../api";
import Emails from "../components/Emails";
export default function dashboard({ token, setEmails, emails }) {
  const [nextPageToken, setNextPageToken] = useState("");
  useEffect(() => {
    if (token !== "") {
      getMessages("").then(res => {
        setEmails(res.messages);
        setNextPageToken(res.nextPageToken);
      });
    }
  }, [token]);

  function handleLoadMore() {
    console.log("handling loading more...");
    getMessages(nextPageToken).then(res => {
      setEmails([...emails, ...res.messages]);
      setNextPageToken(res.nextPageToken);
    });
  }
  return (
    <>
      <SignOut />
      {emails !== null ? (
        <Emails emails={emails} onLoadMore={handleLoadMore} />
      ) : (
        "Loading..."
      )}
    </>
  );
}
