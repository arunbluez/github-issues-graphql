/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  query SearchRepoQuery($searchText: String!) {\n    search(query: $searchText, type: REPOSITORY, first: 5) {\n      nodes {\n        ... on Repository {\n          id\n          name\n          url\n          owner {\n            id\n            avatarUrl\n          }\n        }\n      }\n    }\n  }\n": types.SearchRepoQueryDocument,
    "\nquery RepoDetailsQuery($repoName: String!, $ownerName: String!) {\n    repository(name: $repoName, owner: $ownerName) {\n        id\n        name\n        url\n        description\n        homepageUrl\n        owner {\n          id\n        }\n        forks {\n          totalCount\n        }\n        stargazers {\n            totalCount\n        }\n        watchers {\n          totalCount\n        },\n        issues(first: 1) {\n            totalCount\n            pageInfo {\n                endCursor\n                startCursor\n              }\n        },\n        labels {\n          totalCount\n        }\n    }\n  }": types.RepoDetailsQueryDocument,
    "\nquery IssuesLabelsQuery($repoName: String!, $ownerName: String!, $labelCount: Int = 100) {\n    repository(name: $repoName, owner: $ownerName) {\n        labels(first: $labelCount) {\n            totalCount\n            nodes {\n              name\n              color\n            }\n          }\n        }\n    }": types.IssuesLabelsQueryDocument,
    "\n    query IssuesListQuery($repoName: String!, $ownerName: String!, $issueState: [IssueState!], $afterCursor: String) {\n    repository(name: $repoName, owner: $ownerName) {\n        id\n        issues(first: 20, orderBy: {field: CREATED_AT, direction: DESC}, after: $afterCursor, states: $issueState) {\n            totalCount\n            pageInfo {\n              endCursor\n              startCursor\n            }\n            nodes {\n              title\n              number\n              state\n              comments {\n                totalCount\n              }\n              createdAt\n              closedAt\n              id\n            }\n          }\n      }\n    }\n    ": types.IssuesListQueryDocument,
    "\nquery SearchIssuesListQuery($searchString: String!, $afterCursor: String) {\n    search(query: $searchString, type: ISSUE, first: 20, after: $afterCursor) {\n        pageInfo {\n            endCursor\n            startCursor\n          }\n        nodes {\n          ... on Issue {\n              title\n              number\n              state\n              comments {\n                totalCount\n              }\n              createdAt\n              closedAt\n              id\n          }\n        }\n      }\n}\n": types.SearchIssuesListQueryDocument,
    "\nquery IssueDetails($repoName: String!, $ownerName: String!, $issueNumber: Int!) {\n    repository(name: $repoName, owner: $ownerName) {\n      id\n      issue(number: $issueNumber) {\n        id\n        title\n        state\n        bodyHTML\n        createdAt\n        updatedAt\n        number\n        comments {\n            totalCount\n        }\n        author {\n            ... on User {\n              id\n              name\n            }\n            avatarUrl\n          }\n      }\n    }\n  }": types.IssueDetailsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SearchRepoQuery($searchText: String!) {\n    search(query: $searchText, type: REPOSITORY, first: 5) {\n      nodes {\n        ... on Repository {\n          id\n          name\n          url\n          owner {\n            id\n            avatarUrl\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchRepoQuery($searchText: String!) {\n    search(query: $searchText, type: REPOSITORY, first: 5) {\n      nodes {\n        ... on Repository {\n          id\n          name\n          url\n          owner {\n            id\n            avatarUrl\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery RepoDetailsQuery($repoName: String!, $ownerName: String!) {\n    repository(name: $repoName, owner: $ownerName) {\n        id\n        name\n        url\n        description\n        homepageUrl\n        owner {\n          id\n        }\n        forks {\n          totalCount\n        }\n        stargazers {\n            totalCount\n        }\n        watchers {\n          totalCount\n        },\n        issues(first: 1) {\n            totalCount\n            pageInfo {\n                endCursor\n                startCursor\n              }\n        },\n        labels {\n          totalCount\n        }\n    }\n  }"): (typeof documents)["\nquery RepoDetailsQuery($repoName: String!, $ownerName: String!) {\n    repository(name: $repoName, owner: $ownerName) {\n        id\n        name\n        url\n        description\n        homepageUrl\n        owner {\n          id\n        }\n        forks {\n          totalCount\n        }\n        stargazers {\n            totalCount\n        }\n        watchers {\n          totalCount\n        },\n        issues(first: 1) {\n            totalCount\n            pageInfo {\n                endCursor\n                startCursor\n              }\n        },\n        labels {\n          totalCount\n        }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery IssuesLabelsQuery($repoName: String!, $ownerName: String!, $labelCount: Int = 100) {\n    repository(name: $repoName, owner: $ownerName) {\n        labels(first: $labelCount) {\n            totalCount\n            nodes {\n              name\n              color\n            }\n          }\n        }\n    }"): (typeof documents)["\nquery IssuesLabelsQuery($repoName: String!, $ownerName: String!, $labelCount: Int = 100) {\n    repository(name: $repoName, owner: $ownerName) {\n        labels(first: $labelCount) {\n            totalCount\n            nodes {\n              name\n              color\n            }\n          }\n        }\n    }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query IssuesListQuery($repoName: String!, $ownerName: String!, $issueState: [IssueState!], $afterCursor: String) {\n    repository(name: $repoName, owner: $ownerName) {\n        id\n        issues(first: 20, orderBy: {field: CREATED_AT, direction: DESC}, after: $afterCursor, states: $issueState) {\n            totalCount\n            pageInfo {\n              endCursor\n              startCursor\n            }\n            nodes {\n              title\n              number\n              state\n              comments {\n                totalCount\n              }\n              createdAt\n              closedAt\n              id\n            }\n          }\n      }\n    }\n    "): (typeof documents)["\n    query IssuesListQuery($repoName: String!, $ownerName: String!, $issueState: [IssueState!], $afterCursor: String) {\n    repository(name: $repoName, owner: $ownerName) {\n        id\n        issues(first: 20, orderBy: {field: CREATED_AT, direction: DESC}, after: $afterCursor, states: $issueState) {\n            totalCount\n            pageInfo {\n              endCursor\n              startCursor\n            }\n            nodes {\n              title\n              number\n              state\n              comments {\n                totalCount\n              }\n              createdAt\n              closedAt\n              id\n            }\n          }\n      }\n    }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery SearchIssuesListQuery($searchString: String!, $afterCursor: String) {\n    search(query: $searchString, type: ISSUE, first: 20, after: $afterCursor) {\n        pageInfo {\n            endCursor\n            startCursor\n          }\n        nodes {\n          ... on Issue {\n              title\n              number\n              state\n              comments {\n                totalCount\n              }\n              createdAt\n              closedAt\n              id\n          }\n        }\n      }\n}\n"): (typeof documents)["\nquery SearchIssuesListQuery($searchString: String!, $afterCursor: String) {\n    search(query: $searchString, type: ISSUE, first: 20, after: $afterCursor) {\n        pageInfo {\n            endCursor\n            startCursor\n          }\n        nodes {\n          ... on Issue {\n              title\n              number\n              state\n              comments {\n                totalCount\n              }\n              createdAt\n              closedAt\n              id\n          }\n        }\n      }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery IssueDetails($repoName: String!, $ownerName: String!, $issueNumber: Int!) {\n    repository(name: $repoName, owner: $ownerName) {\n      id\n      issue(number: $issueNumber) {\n        id\n        title\n        state\n        bodyHTML\n        createdAt\n        updatedAt\n        number\n        comments {\n            totalCount\n        }\n        author {\n            ... on User {\n              id\n              name\n            }\n            avatarUrl\n          }\n      }\n    }\n  }"): (typeof documents)["\nquery IssueDetails($repoName: String!, $ownerName: String!, $issueNumber: Int!) {\n    repository(name: $repoName, owner: $ownerName) {\n      id\n      issue(number: $issueNumber) {\n        id\n        title\n        state\n        bodyHTML\n        createdAt\n        updatedAt\n        number\n        comments {\n            totalCount\n        }\n        author {\n            ... on User {\n              id\n              name\n            }\n            avatarUrl\n          }\n      }\n    }\n  }"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;