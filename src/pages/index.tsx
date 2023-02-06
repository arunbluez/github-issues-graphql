import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>GitHub Issues Explorer</title>
        <meta name="description" content="github Issues Explorer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Navbar />
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold text-white sm:text-[5rem]">
            Github Issues
          </h1>
        </div>
      </Layout>
    </>
  );
};

export default Home;
