import React from "react";

interface IProps {
  emails: Email[];
}

interface Email {
  headers: Header[];
  body: string;
}

interface Header {
  name: string;
  value: string;
}

export default function Emails(props: IProps) {
  return <h1>Emails go here</h1>;
}
