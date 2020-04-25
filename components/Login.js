import React from "react";
import { signOut } from "../api/auth";

export default function Login({ onSignIn }) {
  return (
    <>
      <button onClick={onSignIn}>Authorize</button>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}
