import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import NProgress from "nprogress";
import { Router } from "next/router";

import "../styles/globals.css";
import ApolloClient from "../components/ApolloClient";

const GitHubIssuesExplorer: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  NProgress.configure({ showSpinner: false });

  Router.events.on("routeChangeStart", (url) => {
    NProgress.start();
  });

  Router.events.on("routeChangeComplete", (url) => {
    NProgress.done();
  });

  return (
    <SessionProvider session={session}>
      <ApolloClient>
        <Component {...pageProps} />
      </ApolloClient>
    </SessionProvider>
  );
};

export default GitHubIssuesExplorer;
