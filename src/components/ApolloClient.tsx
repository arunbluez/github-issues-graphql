import { ApolloProvider } from "@apollo/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import client, { getGqlClient } from "../utils/apollo-client";

type Props = {
  children: React.ReactNode;
};

export default function ApolloClient({ children }: Props) {
  const [newClient, setNewClient] = useState(client);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      const c = getGqlClient(session.accessToken);
      setNewClient(c);
    }
  }, [session]);

  return <ApolloProvider client={newClient}>{children}</ApolloProvider>;
}
