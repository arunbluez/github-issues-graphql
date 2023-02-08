import React, { useState } from "react";
import {
  IssueDetailsQuery,
  IssueState,
  User,
} from "../../graphql/__generated__/graphql";
import IssueStateIcon from "../Issues/IssueStateIcon";
import TimeAgo from "react-timeago";

type Props = {
  owner: string | string[];
  repo: string | string[];
  issueDetails: IssueDetailsQuery;
};

export default function IssueHead({ owner, repo, issueDetails }: Props) {
  const [author] = useState<User>(
    issueDetails.repository?.issue?.author as User
  );

  console.log(author);
  return (
    <div className="stats w-full py-4 px-2 shadow">
      <div className="stat">
        <p>
          {owner}/{repo}
        </p>
        <h1 className="text-2xl font-bold text-white">
          <span>{issueDetails.repository?.issue?.title}</span>
          <span className="ml-2 font-light text-secondary">
            #{issueDetails.repository?.issue?.number}
          </span>
        </h1>
        <div className="mt-2 flex items-center gap-4">
          <div
            className={`flex max-w-max items-center gap-2 rounded-full ${
              issueDetails.repository?.issue?.state === IssueState.Open
                ? "bg-green-500"
                : "bg-secondary"
            } py-1 px-4 text-white`}
          >
            <IssueStateIcon
              state={issueDetails.repository?.issue?.state!}
              size={18}
              withColor={false}
            />
            <span className="font-bold uppercase">
              {issueDetails.repository?.issue?.state}
            </span>
          </div>
          <p>
            {author.name} opened this issue{" "}
            <TimeAgo date={issueDetails.repository?.issue?.updatedAt} /> ·{" "}
            {issueDetails.repository?.issue?.comments.totalCount} comments
          </p>
        </div>
      </div>
    </div>
  );
}
