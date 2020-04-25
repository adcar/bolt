import React from "react";
import GoogleButton from "react-google-button";

interface IProps {
  onSignIn(): void;
}
export default function SignInBtn({ onSignIn }: IProps) {
  return <GoogleButton onClick={onSignIn} />;
}
