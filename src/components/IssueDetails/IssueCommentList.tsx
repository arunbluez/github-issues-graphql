import React from "react";
import IssueComment from "./IssueComment";

export default function IssueCommentList({}) {
  return (
    <div className="w-full">
      <IssueComment username="arunblues" date={new Date()} content={""} />
      <p></p>
    </div>
  );
}
