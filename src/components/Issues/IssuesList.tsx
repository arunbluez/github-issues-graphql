import React, { useEffect, useState } from "react";
import {
  IssuesListQueryQuery,
  IssueState,
} from "../../graphql/__generated__/graphql";
import IssueStateIcon from "./IssueStateIcon";
import TimeAgo from "react-timeago";
import { FaRedo, FaRegCommentAlt } from "react-icons/fa";
import { useLazyQuery } from "@apollo/client";
import { ISSUES_LIST } from "../../graphql/queries.graphql";
import { useBoundStore } from "../../stores/store";
import IssuesStateBtnGrp from "./IssuesStateBtnGrp";
import IssuesLabels from "./IssuesLabels";
import { getGqlClient } from "../../graphql/client.graphql";
import Link from "next/link";

type Props = {
  issuesList: IssuesListQueryQuery;
};

type LoadingProps = {
  id: number;
};

export default function IssuesList({ issuesList }: Props) {
  const [issuesListState, setIssuesListState] =
    useState<IssuesListQueryQuery | null>(null);

  const repoName = useBoundStore((state) => state.repoName);
  const ownerName = useBoundStore((state) => state.ownerName);
  const btnState = useBoundStore((state) => state.btnState);
  const searchText = useBoundStore((state) => state.searchText);
  const searchState = useBoundStore((state) => state.searchState);
  const isSearchQueryLoading = useBoundStore(
    (state) => state.isSearchQueryLoading
  );
  const issueListStore = useBoundStore((state) => state.issueListStore);
  const setSearchState = useBoundStore((state) => state.setSearchState);
  const setSearchText = useBoundStore((state) => state.setSearchText);
  const setBtnState = useBoundStore((state) => state.setBtnState);
  const setIssuesListStore = useBoundStore((state) => state.setIssuesListStore);

  const [getIssueList, { loading, error, data: newData, refetch }] =
    useLazyQuery(ISSUES_LIST);

  // useEffect(() => {
  //   if (issuesList) {
  //     setIssuesListState(issuesList);
  //   }
  //   return () => {
  //     setIssuesListState(null);
  //   };
  // }, [issuesList]);

  useEffect(() => {
    if (issueListStore) {
      setIssuesListState({ ...issueListStore });
    }
    return () => {
      setIssuesListState(null);
    };
  }, [issueListStore]);

  useEffect(() => {
    if (repoName && ownerName && !searchState) {
      getIssueList({
        variables: {
          repoName: repoName,
          ownerName: ownerName,
          issueState: btnState,
        },
      });
    }
  }, [repoName, ownerName, btnState]);

  useEffect(() => {
    if (newData) {
      setIssuesListStore({ ...newData });
    }
  }, [newData]);

  const resetList = () => {
    refetch();
    setIssuesListStore({ ...newData });
    setSearchState(false);
    setSearchText("");
    setBtnState(IssueState.Open);
  };

  const LoadingItem = ({ id }: LoadingProps) => (
    <tr key={id}>
      <td className="">
        <div className="h-4 w-4 animate-pulse rounded-xl bg-gray-700"></div>
      </td>
      <td className="w-full">
        <div className="h-4 w-1/2 animate-pulse rounded-xl bg-gray-700"></div>
        <div className="mt-2 h-2 w-1/4 animate-pulse rounded-xl bg-gray-700"></div>
      </td>
      <td className="">
        <div className="h-4 w-8 animate-pulse rounded-xl bg-gray-700"></div>
      </td>
    </tr>
  );

  return (
    <div className="mt-2 overflow-hidden">
      <div className="w-full rounded-t-xl bg-base-100 p-4">
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
          <div className="flex items-center gap-4">
            <p className="text-xl md:text-2xl">
              Showing {btnState === IssueState.Open ? "open" : "closed"} Issues
              {!searchState
                ? ": " +
                  issuesListState?.repository?.issues.nodes?.length +
                  "/" +
                  issuesListState?.repository?.issues.totalCount
                : ' with "' + searchText + '"'}
            </p>
            {searchState && (
              <button onClick={resetList} className="btn btn-sm gap-2">
                <FaRedo size={20} />
                <span>reset</span>
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <IssuesStateBtnGrp />
            <IssuesLabels />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full overflow-scroll rounded-b-xl bg-gray-700">
          <tbody>
            {issuesListState && !loading && !isSearchQueryLoading
              ? issuesListState?.repository?.issues.nodes?.map((x, i) => (
                  <tr key={i.toString()} className="hover:bg-gray-600">
                    <td className="max-w-max bg-transparent p-0 pl-4">
                      <IssueStateIcon state={x?.state!} />
                    </td>
                    <td className="w-full bg-transparent">
                      <Link
                        href={`${ownerName}/${repoName}/issue/${x?.number}`}
                        className="cursor-pointer truncate break-normal text-white md:text-xl"
                      >
                        {x?.title}
                      </Link>
                      <p className="text-sm md:text-base">
                        #{x?.number} was{" "}
                        {x?.state === IssueState.Open ? "opened" : "closed"}{" "}
                        <TimeAgo
                          date={
                            x?.state === IssueState.Open
                              ? x?.createdAt
                              : x?.closedAt
                          }
                        />
                      </p>
                    </td>
                    <td className="bg-transparent">
                      {x?.comments.totalCount! > 0 && (
                        <div className="flex items-center gap-2">
                          <span>{x?.comments.totalCount}</span>{" "}
                          <FaRegCommentAlt size={18} />
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              : new Array(20).fill(1).map((x, i) => (
                  <div key={i}>
                    <LoadingItem id={i} />
                  </div>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
