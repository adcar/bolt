import React, { useEffect, useState } from "react";
import SignOut from "../components/SignOut";
import { getMessages } from "../api";
import Emails from "../components/Emails";
export default function dashboard({ token }) {
  const [emails, setEmails] = useState(null);
  useEffect(() => {
    if (token !== "") {
      getMessages().then(setEmails);
    }
  }, [token]);

  return (
    <>
      <SignOut />
      {emails !== null ? <Emails emails={emails} /> : "Loading..."}
    </>
  );
}
