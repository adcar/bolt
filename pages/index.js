import React from "react";
import LogIn from "../components/SignIn";

export default function SplashPage({ onSignIn }) {
  return (
    <div className="container">
      <h1>Splash page here</h1>
      <LogIn onSignIn={onSignIn} />
    </div>
  );
}
