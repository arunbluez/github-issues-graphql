import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useMemo } from "react";
import { SEARCH_ISSUES_LIST } from "../../graphql/queries.graphql";
import { Issue, IssueState } from "../../graphql/__generated__/graphql";
import { useInput } from "../../hooks/useInput";
import { useBoundStore } from "../../stores/store";

type Props = {
  className?: string;
};

export default function IssuesSearch({ className = "" }: Props) {
  const [getSearchIssue, { loading, error, data }] =
    useLazyQuery(SEARCH_ISSUES_LIST);
  const repoName = useBoundStore((state) => state.repoName);
  const ownerName = useBoundStore((state) => state.ownerName);
  const btnState = useBoundStore((state) => state.btnState);
  const searchText = useBoundStore((state) => state.searchText);
  const setSearchState = useBoundStore((state) => state.setSearchState);
  const setSearchText = useBoundStore((state) => state.setSearchText);
  const setIsSearchQueryLoading = useBoundStore(
    (state) => state.setIsSearchQueryLoading
  );
  const setIssuesNode = useBoundStore((state) => state.setIssuesNode);

  setIsSearchQueryLoading(loading);

  const {
    value: searchIssueText,
    bind: bindSearchIssueText,
    setValue: setSearchIssueText,
  } = useInput("");

  useEffect(() => {
    if (searchText === "") {
      setSearchIssueText("");
    }
  }, [searchText]);

  useEffect(() => {
    if (data && data.search && data.search.nodes && !error) {
      const nodes = data.search.nodes as Issue[];
      setIssuesNode(nodes);
    }
  }, [data, error]);

  const search = () => {
    if (searchIssueText.length > 2 && !loading) {
      setSearchText(searchIssueText);
      setSearchState(true);
      getSearchIssue({
        variables: {
          searchString: `${searchIssueText} repo:${ownerName}/${repoName} state:${
            btnState === IssueState.Open ? "open" : "closed"
          } is:issue`,
        },
      });
    }
  };

  useEffect(() => {
    search();
  }, [btnState]);

  return (
    <div className="input-group max-w-sm">
      <input
        {...bindSearchIssueText}
        type="text"
        placeholder="Search Issues"
        className={`input-bordered input w-full max-w-xl ${className}`}
      />
      <button onClick={search} className="btn btn-square">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  );
}
