import { GetServerSideProps, type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import RepoDetails from "../components/RepoDetails";
import { getGqlEdgeClient } from "../graphql/edgeClient.graphql";
import { REPO_DETAILS } from "../graphql/queries.graphql";
import { clientEnv } from "../env/schema.mjs";
import { RepoDetailsQueryQuery } from "../graphql/__generated__/graphql";

type PageProps = {
  data: RepoDetailsQueryQuery | null;
  owner: string | null;
};

const Home: NextPage<PageProps> = ({ data, owner }) => {
  return (
    <>
      <Head>
        <title>GitHub Issues Explorer</title>
        <meta name="description" content="github Issues Explorer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Navbar />
        <div className="flex w-full flex-col items-center justify-center gap-12 px-4 py-4">
          <RepoDetails data={data!} owner={owner!} />
          <h1 className="text-5xl font-extrabold text-white sm:text-[5rem]">
            Github Issues
          </h1>
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

  const { data, loading, error } = await client.query({
    query: REPO_DETAILS,
    variables: {
      repoName: clientEnv.NEXT_PUBLIC_DEFAULT_REPO!,
      ownerName: clientEnv.NEXT_PUBLIC_DEFAULT_OWNER!,
    },
  });

  if (!error) {
    return {
      props: {
        data,
        owner: clientEnv.NEXT_PUBLIC_DEFAULT_OWNER!,
      },
    };
  } else {
    return {
      props: {
        data: null,
        owner: null,
      },
    };
  }
};
