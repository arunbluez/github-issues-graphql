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
      owner {
        id
      }
      description
      watchers {
        totalCount
      }
      stargazers {
        totalCount
      }
      issues {
        totalCount
      }
      forks {
        totalCount
      }
      homepageUrl
      repositoryTopics(first: 20) {
        totalCount
        nodes {
          topic {
            name
          }
        }
      }
    }
  }`);
