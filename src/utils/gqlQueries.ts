import { gql } from "@apollo/client";

export const SearchRepoQuery = gql`
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
