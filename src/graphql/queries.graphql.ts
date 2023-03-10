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
        id
        name
        url
        description
        homepageUrl
        owner {
          id
        }
        forks {
          totalCount
        }
        stargazers {
            totalCount
        }
        watchers {
          totalCount
        },
        issues(first: 1) {
            totalCount
            pageInfo {
                endCursor
                startCursor
              }
        },
        labels {
          totalCount
        }
    }
  }`);

export const ISSUES_LABELS = gql(`
query IssuesLabelsQuery($repoName: String!, $ownerName: String!, $labelCount: Int = 100) {
    repository(name: $repoName, owner: $ownerName) {
        id
        labels(first: $labelCount) {
            totalCount
            nodes {
              name
              color
            }
          }
        }
    }`);

export const ISSUES_LIST = gql(`
    query IssuesListQuery($repoName: String!, $ownerName: String!, $issueState: [IssueState!], $afterCursor: String) {
    repository(name: $repoName, owner: $ownerName) {
        id
        issues(first: 20, orderBy: {field: CREATED_AT, direction: DESC}, after: $afterCursor, states: $issueState) {
            totalCount
            pageInfo {
              endCursor
              startCursor
            }
            nodes {
              title
              number
              state
              comments(first: 1) {
                totalCount
                pageInfo {
                    startCursor
                    endCursor
                  }
              }
              createdAt
              closedAt
              id
            }
          }
      }
    }
    `);

export const SEARCH_ISSUES_LIST = gql(`
query SearchIssuesListQuery($searchString: String!, $afterCursor: String) {
    search(query: $searchString, type: ISSUE, first: 20, after: $afterCursor) {
        pageInfo {
            endCursor
            startCursor
          }
        nodes {
          ... on Issue {
              title
              number
              state
              comments(first: 1) {
                totalCount
                pageInfo {
                    startCursor
                    endCursor
                  }

              }
              createdAt
              closedAt
              id
          }
        }
      }
}
`);

export const ISSUE_DETAILS = gql(`
query IssueDetails($repoName: String!, $ownerName: String!, $issueNumber: Int!) {
    repository(name: $repoName, owner: $ownerName) {
      id
      issue(number: $issueNumber) {
        id
        title
        state
        body
        bodyHTML
        createdAt
        updatedAt
        number
        comments(first: 1) {
            totalCount
            pageInfo {
                startCursor
                endCursor
              }
        }
        author {
            ... on User {
              id
              name
            }
            avatarUrl
          }
      }
    }
  }`);

export const ISSUE_COMMENTS = gql(`
query IssueCommentsQuery($repoName: String!, $ownerName: String!, $issueNumber: Int!, $afterCursor: String) {
    repository(name: $repoName, owner: $ownerName) {
    id
    issue(number: $issueNumber) {
      id
      bodyHTML
      createdAt
      number
      comments(first: 20, orderBy: {field: UPDATED_AT, direction: DESC}, after: $afterCursor) {
        totalCount
        pageInfo {
          startCursor
          endCursor
        }
        nodes {
          author {
            avatarUrl
            ... on User {
              id
              name
            }
          }
          bodyHTML
          createdAt
          updatedAt
        }
      }
    }
  }
}`);
