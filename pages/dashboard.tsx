import React, { useEffect } from "react";
import SignOut from "../components/SignOut";
import { listLabels } from "../api";
export default function dashboard({ token }) {
  useEffect(() => {
    if (token !== "") {
      listLabels();
    }
  }, [token]);

  return (
    <>
      <SignOut />
    </>
  );
}
