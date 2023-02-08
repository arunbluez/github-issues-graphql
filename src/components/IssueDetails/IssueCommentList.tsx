import React from "react";
import IssueComment from "./IssueComment";

type Props = {};

export default function IssueCommentList({}: Props) {
  return (
    <div className="w-full">
      <IssueComment username="arunblues" date={new Date()} content={""} />
      <p></p>
    </div>
  );
}
