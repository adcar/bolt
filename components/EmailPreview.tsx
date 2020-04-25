import React from "react";
import styles from "./EmailPreview.module.css";
import Email from "../types/EmailInterface";
const Entities = require("html-entities").XmlEntities;

interface IProps {
  email: Email;
}

export default function EmailPreview({ email }: IProps) {
  // TODO: Optimize this by putting it in one loop
  const from = email.headers.find(x => x.name === "From").value;

  const fromName = from.replace(/ <.*/, "");
  //const fromEmail = from.replace(/.*</, "").replace(">", "");

  const subjectObj = email.headers.find(x => x.name === "Subject");
  let subject;
  if (subjectObj) {
    subject = subjectObj.value;
  } else {
    subject = "(No subject)";
  }

  const snippetWithEntities = email.snippet;

  const entities = new Entities();

  const snippet = entities.decode(snippetWithEntities);

  return (
    <div className={styles.root}>
      <p className={styles.name}>{fromName}</p>
      <p className={styles.subject}>
        <strong>{subject}</strong> -{" "}
        <span className={styles.snippet}>{snippet}</span>
      </p>
    </div>
  );
}
