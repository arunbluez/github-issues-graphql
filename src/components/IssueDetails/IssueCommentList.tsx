import React, { useEffect, useMemo, useState } from "react";
import {
  IssueComment,
  IssueCommentsQueryQuery,
  IssueDetailsQuery,
  User,
} from "../../graphql/__generated__/graphql";
import { processMarkdownData } from "../../utils/generalUtils";
import IssueCommentItem from "./IssueCommentItem";

type Props = {
  mainAuthor: User;
  issueData: IssueDetailsQuery;
  issueComments: IssueCommentsQueryQuery;
};

type Comment = {
  author: User;
  date: Date;
  body: string;
};

export default function IssueCommentList({
  mainAuthor,
  issueData,
  issueComments,
}: Props) {
  const [isCommentParsing, setIsCommentParsing] = useState(false);

  return (
    <div className="w-full">
      <IssueCommentItem
        isLoading={isCommentParsing}
        user={mainAuthor}
        date={issueData.repository?.issue?.updatedAt}
        content={issueData.repository?.issue?.bodyHTML}
        isHtml
      />
      {issueComments?.repository?.issue?.comments?.nodes &&
        issueComments?.repository?.issue?.comments?.nodes.map((x, i) => {
          let issueComment = x as IssueComment;
          let issueAuthor = x?.author as User;

          return (
            <IssueCommentItem
              isLoading={isCommentParsing}
              user={issueAuthor}
              date={issueComment.updatedAt}
              content={issueComment.bodyHTML}
              isOriginalPoster={issueAuthor.id === mainAuthor.id}
              isHtml
            />
          );
        })}
    </div>
  );
}
