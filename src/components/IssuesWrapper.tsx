import React from "react";
import {
  IssuesLabelsQueryQuery,
  IssuesListQueryQuery,
} from "../graphql/__generated__/graphql";
import { useBoundStore } from "../stores/store";
import IssuesList from "./Issues/IssuesList";
import IssuesSearch from "./Issues/IssuesSearch";
import IssuesStateBtnGrp from "./Issues/IssuesStateBtnGrp";

type Props = {
  issueLabels: IssuesLabelsQueryQuery;
  issuesList: IssuesListQueryQuery;
};

export default function IssuesWrapper({ issueLabels, issuesList }: Props) {
  const repoName = useBoundStore((state) => state.repoName);
  const ownerName = useBoundStore((state) => state.ownerName);

  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-between gap-2 p-2 md:flex-row md:items-center">
        <div>
          <p className="text-2xl font-bold text-white">
            {ownerName}/{repoName}
          </p>
          <p className="text-sm">repository issues: </p>
        </div>
        <div className="flex w-full flex-1 items-center justify-end gap-2">
          <IssuesSearch className="flex-1" />
        </div>
      </div>
      <IssuesList issuesList={issuesList} />
    </div>
  );
}
