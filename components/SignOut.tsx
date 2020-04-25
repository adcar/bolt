import React from "react";
import { signOut } from "../api/auth";
import SignOutBtn from "./SignOutBtn";
import { useRouter } from "next/router";

export default function SignOut() {
  const router = useRouter();
  function handleSignOut() {
    signOut().then(router.push("/"));
  }
  return <SignOutBtn onSignOut={handleSignOut} />;
}
