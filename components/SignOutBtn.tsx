import React from "react";
interface IProps {
  onSignOut(): void;
}
export default function SignOutBtn({ onSignOut }: IProps) {
  return <button onClick={onSignOut}>Sign out</button>;
}
