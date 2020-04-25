import React from "react";
import EmailPreview from "./EmailPreview";
import Email from "../types/EmailInterface";

interface IProps {
  emails: Email[];
}

export default function Emails({ emails }: IProps) {
  const prevs = emails.map((email, index) => (
    <EmailPreview email={email} key={index} />
  ));

  return <div>{prevs}</div>;
}
