import React, { useEffect } from "react";
import { useInput } from "../hooks/useInput";
import { useLazyQuery, gql } from "@apollo/client";

type Props = {};

const QUERY = gql`
  query SearchRepoQuery($searchText: String!) {
    search(query: $searchText, type: REPOSITORY, first: 5) {
      nodes {
        ... on Repository {
          id
          name
          owner {
            id
            avatarUrl
            ... on Organization {
              id
              name
            }
            ... on User {
              name
              id
            }
          }
        }
      }
    }
  }
`;

export default function SearchRepos({}: Props) {
  const [getRepos, { loading, error, data }] = useLazyQuery(QUERY);

  console.log(data, loading, error);
  const {
    value: searchText,
    bind: bindSearchText,
    setValue: setSearchText,
  } = useInput("");

  useEffect(() => {
    if (searchText.length > 3) {
      getRepos({
        variables: {
          searchText: searchText,
        },
      });
    }
  }, [searchText]);

  const LoadingItem = () => (
    <div className="flex items-center justify-start gap-2 py-2 px-3">
      <div className="h-12 w-12 animate-pulse rounded-full bg-gray-500"></div>
      <div className="flex flex-1 flex-col items-start gap-2">
        <div className="h-4 w-full animate-pulse rounded-xl bg-gray-500"></div>
        <div className="h-2 w-full animate-pulse rounded-xl bg-gray-500"></div>
      </div>
    </div>
  );

  return (
    <div className={`${searchText.length > 2 && "dropdown dropdown-open"}`}>
      <input
        {...bindSearchText}
        placeholder="Search a Repository"
        className="input-bordered input w-full max-w-xs"
      />
      {searchText.length > 2 && (
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
    </div>
  );
}
