import { GetServerSideProps, type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import RepoDetails from "../components/RepoDetails";
import { getGqlEdgeClient } from "../graphql/edgeClient.graphql";
import {
  ISSUES_LABELS,
  ISSUES_LIST,
  REPO_DETAILS,
} from "../graphql/queries.graphql";
import { clientEnv } from "../env/schema.mjs";
import {
  IssuesLabelsQueryQuery,
  IssuesListQueryQuery,
  IssueState,
  RepoDetailsQueryQuery,
} from "../graphql/__generated__/graphql";
import IssuesWrapper from "../components/IssuesWrapper";
import { useBoundStore } from "../stores/store";
import { useEffect } from "react";

type PageProps = {
  repoDetails: RepoDetailsQueryQuery | null;
  issueLabels: IssuesLabelsQueryQuery | null;
  issuesList: IssuesListQueryQuery | null;
  owner: string | null;
};

const Home: NextPage<PageProps> = ({
  repoDetails,
  issueLabels,
  issuesList,
  owner,
}) => {
  const setIssuesListStore = useBoundStore((state) => state.setIssuesListStore);

  useEffect(() => {
    setIssuesListStore(issuesList!);
  }, [issuesList]);

  return (
    <>
      <Head>
        <title>GitHub Issues Explorer</title>
        <meta name="description" content="github Issues Explorer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Navbar />
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 overflow-auto px-4 py-4">
          <RepoDetails data={repoDetails!} owner={owner!} />
          <IssuesWrapper issueLabels={issueLabels!} issuesList={issuesList!} />
        </div>
      </Layout>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  const client = getGqlEdgeClient();

  const repoDetails = await client.query({
    query: REPO_DETAILS,
    variables: {
      repoName: clientEnv.NEXT_PUBLIC_DEFAULT_REPO!,
      ownerName: clientEnv.NEXT_PUBLIC_DEFAULT_OWNER!,
    },
  });

  const issueLabels = await client.query({
    query: ISSUES_LABELS,
    variables: {
      repoName: clientEnv.NEXT_PUBLIC_DEFAULT_REPO!,
      ownerName: clientEnv.NEXT_PUBLIC_DEFAULT_OWNER!,
    },
  });

  const issuesList = await client.query({
    query: ISSUES_LIST,
    variables: {
      repoName: clientEnv.NEXT_PUBLIC_DEFAULT_REPO!,
      ownerName: clientEnv.NEXT_PUBLIC_DEFAULT_OWNER!,
      issueState: IssueState.Open,
    },
  });

  if (!repoDetails.error || !issueLabels.error || !issuesList.error) {
    return {
      props: {
        repoDetails: repoDetails.data,
        issueLabels: issueLabels.data,
        issuesList: issuesList.data,
        owner: clientEnv.NEXT_PUBLIC_DEFAULT_OWNER!,
      },
    };
  } else {
    return {
      props: {
        repoDetails: null,
        issueLabels: null,
        issuesList: null,
        owner: null,
      },
    };
  }
};
