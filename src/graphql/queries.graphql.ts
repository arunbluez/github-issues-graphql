import { gql } from "./__generated__/gql";

export const SEARCH_REPO = gql(`
  query SearchRepoQuery($searchText: String!) {
    search(query: $searchText, type: REPOSITORY, first: 5) {
      nodes {
        ... on Repository {
          id
          name
          url
          owner {
            id
            avatarUrl
          }
        }
      }
    }
  }
`);

export const REPO_DETAILS = gql(`
query RepoDetailsQuery($repoName: String!, $ownerName: String!) {
    repository(name: $repoName, owner: $ownerName) {
        name
        url
        description
        homepageUrl
        owner {
          id
        }
        issues {
          totalCount
        }
        forks {
          totalCount
        }
        stargazers {
            totalCount
        }
        watchers {
          totalCount
        }
    }
  }`);
