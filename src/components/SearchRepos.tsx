import React, { useEffect, useMemo, useState } from "react";
import { useInput } from "../hooks/useInput";
import { useLazyQuery, gql } from "@apollo/client";
import { SEARCH_REPO } from "../graphql/queries.graphql";
import { Repository } from "../graphql/__generated__/graphql";
import { useBoundStore } from "../stores/store";

type Props = {};

type SearchRepoList = {
  repoName: string;
  repoUrl: string;
  ownerImg: string;
};

export default function SearchRepos({}: Props) {
  const [getRepos, { loading, error, data }] = useLazyQuery(SEARCH_REPO);
  const [searchRepoList, setSearchRepoList] = useState<SearchRepoList[]>([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const setNames = useBoundStore((state) => state.setNames);

  const {
    value: searchText,
    bind: bindSearchText,
    setValue: setSearchText,
  } = useInput("");

  useMemo(() => {
    if (data && data.search && data.search.nodes) {
      const searchList = data.search.nodes as Repository[];
      const formatedList = searchList.map((x) => {
        return {
          repoName: x.name,
          repoUrl: x.url,
          ownerImg: x.owner.avatarUrl,
        };
      });
      setSearchRepoList(formatedList);
    }
  }, [data]);

  useEffect(() => {
    if (searchText.length > 3) {
      getRepos({
        variables: {
          searchText: searchText,
        },
      });
    }
  }, [searchText]);

  const getOwnerFromUrl = (url: string) => {
    const ownerRepo = url.split("https://github.com/")[1];
    const owner = ownerRepo?.split("/")[0];
    return owner ? owner : "";
  };

  const LoadingItem = () => (
    <div className="flex items-center justify-start gap-2 py-2 px-3">
      <div className="h-12 w-12 animate-pulse rounded-full bg-gray-500"></div>
      <div className="flex flex-1 flex-col items-start gap-2">
        <div className="h-4 w-full animate-pulse rounded-xl bg-gray-500"></div>
        <div className="h-2 w-full animate-pulse rounded-xl bg-gray-500"></div>
      </div>
    </div>
  );

  const SearchItem = ({ repoName, repoUrl, ownerImg }: SearchRepoList) => (
    <div className="flex items-center justify-start gap-4 border-b border-gray-400 py-2 px-3">
      <img src={ownerImg} alt="avatar" className="w-12 rounded-full" />
      <div className="flex flex-1 flex-col items-start gap-1">
        <div className="text-2xl text-black dark:text-white">{repoName}</div>
        <div className="text-sm">{repoUrl.split("https://github.com/")[1]}</div>
      </div>
    </div>
  );

  return (
    <div className={`${searchText.length > 2 && "dropdown dropdown-open"}`}>
      <input
        {...bindSearchText}
        onFocus={() => setSearchFocused(true)}
        onBlur={() => {
          setTimeout(() => {
            setSearchFocused(false);
          }, 500);
        }}
        placeholder="Search a Repository"
        className="input-bordered input mt-2 w-full max-w-xs"
      />
      {searchText.length > 2 && loading && searchFocused && (
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
        >
          <li>
            <LoadingItem />
          </li>
          <li>
            <LoadingItem />
          </li>
        </ul>
      )}
      {searchText.length > 2 &&
        searchRepoList.length > 0 &&
        !loading &&
        searchFocused && (
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box my-2 w-max max-w-max bg-base-100 p-2 shadow"
          >
            {searchRepoList.map((x, i) => (
              <li
                onClick={() => {
                  setSearchText("");
                  setNames({
                    repoName: x.repoName,
                    ownerName: getOwnerFromUrl(x.repoUrl),
                  });
                }}
                key={i}
              >
                <SearchItem
                  repoName={x.repoName}
                  repoUrl={x.repoUrl}
                  ownerImg={x.ownerImg}
                />
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}
