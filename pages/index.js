import React from "react";
import dynamic from "next/dynamic";
const Auth = dynamic(() => import("../components/Auth"), { ssr: false });

export default function AuthPage({ onLogin }) {
  return (
    <div className="container">
      <Auth onLogin={onLogin} />
    </div>
  );
}
