import React from "react";
import SignInBtn from "./SignInBtn";
import { useRouter } from "next/router";
import { signIn } from "../api/auth";

interface IProps {
  onSignIn(token: string): void;
}

export default function SignIn({ onSignIn }: IProps) {
  const router = useRouter();
  function handleSignIn() {
    signIn().then(onSignInSuccess);
  }

  function onSignInSuccess(googleUser) {
    onSignIn(googleUser["tc"]["access_token"]);
    router.push("/dashboard");
  }

  return <SignInBtn onSignIn={handleSignIn} />;
}
