import React, { useEffect } from "react";

export default function id(props) {
  console.log(props);
  useEffect(() => {
    const emails = localStorage.getItem("emails");
    console.log(JSON.parse(emails));
  }, []);

  return (
    <div>
      <p>This is a email page.@#$%^&*(</p>
    </div>
  );
}
