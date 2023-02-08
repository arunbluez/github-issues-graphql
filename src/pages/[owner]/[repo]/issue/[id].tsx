import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import IssueCommentList from "../../../../components/IssueDetails/IssueCommentList";
import IssueHead from "../../../../components/IssueDetails/IssueHead";
import Layout from "../../../../components/Layout";
import Navbar from "../../../../components/Navbar";
import { clientEnv } from "../../../../env/schema.mjs";
import { getGqlEdgeClient } from "../../../../graphql/edgeClient.graphql";
import {
  ISSUE_COMMENTS,
  ISSUE_DETAILS,
} from "../../../../graphql/queries.graphql";
import {
  IssueCommentsQueryQuery,
  IssueDetailsQuery,
  User,
} from "../../../../graphql/__generated__/graphql";

type PageProps = {
  issueDetails: IssueDetailsQuery | null;
  issueComments: IssueCommentsQueryQuery | null;
};

const IssuePage: NextPage<PageProps> = ({ issueDetails, issueComments }) => {
  const router = useRouter();
  const { owner, repo, id } = router.query;
  const [author] = useState<User>(
    issueDetails?.repository?.issue?.author as User
  );

  return (
    <>
      <Head>
        <title>
          GitHub Issues Explorer | {owner}/{repo} Issue #{id}
        </title>
        <meta name="description" content="github Issues Explorer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Navbar showBack />
        <div className="mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center gap-4 overflow-auto px-4 py-4">
          <IssueHead
            owner={owner!}
            repo={repo!}
            author={author}
            issueDetails={issueDetails!}
          />
          <IssueCommentList
            mainAuthor={author}
            issueData={issueDetails!}
            issueComments={issueComments!}
          />
        </div>
      </Layout>
    </>
  );
};

export default IssuePage;

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  const { owner, repo, id } = context.query;

  if (
    typeof owner !== "string" ||
    typeof repo !== "string" ||
    typeof id !== "string"
  ) {
    return {
      props: {
        issueDetails: null,
        issueComments: null,
      },
    };
  }

  const client = getGqlEdgeClient();

  const issueDetails = await client.query({
    query: ISSUE_DETAILS,
    variables: {
      repoName: repo,
      ownerName: owner,
      issueNumber: parseInt(id),
    },
  });
  const issueCommentsDetails = await client.query({
    query: ISSUE_COMMENTS,
    variables: {
      repoName: repo,
      ownerName: owner,
      issueNumber: parseInt(id),
    },
  });

  if (!issueDetails.error && !issueCommentsDetails.error) {
    return {
      props: {
        issueDetails: issueDetails.data,
        issueComments: issueCommentsDetails.data,
      },
    };
  } else {
    return {
      props: {
        issueDetails: null,
        issueComments: null,
      },
    };
  }
};
