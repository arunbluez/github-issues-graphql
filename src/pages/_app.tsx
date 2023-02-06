import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";
import ApolloClient from "../components/ApolloClient";

const GitHubIssuesExplorer: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ApolloClient>
        <Component {...pageProps} />
      </ApolloClient>
    </SessionProvider>
  );
};

export default GitHubIssuesExplorer;
