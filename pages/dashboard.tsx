import React, { useEffect } from "react";
import SignOut from "../components/SignOut";
import { getMessages } from "../api";
export default function dashboard({ token }) {
  useEffect(() => {
    (async () => {
      if (token !== "") {
        const res = await getMessages();
        console.log(res);
      }
    })();
  }, [token]);

  return (
    <>
      <SignOut />
    </>
  );
}
