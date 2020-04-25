import React from "react";
import GoogleButton from "react-google-button";
import { signOut } from "../api/auth";

export default function Login({ onSignIn }) {
  return (
    <>
      <GoogleButton onClick={onSignIn} />
      <button onClick={signOut}>Sign out</button>
    </>
  );
}
