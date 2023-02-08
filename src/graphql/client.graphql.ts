import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { clientEnv } from "../env/schema.mjs";

let apolloClientCache: ApolloClient<NormalizedCacheObject>;

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
});

const cacheOptions = {
  typePolicies: {
    IssueConnection: {
      keyFields: ["pageInfo", ["startCursor", "endCursor"]],
    },
    Repository: {
      keyFields: ["id"],
    },
  },
};

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = clientEnv.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(cacheOptions),
});

export const getGqlClient = (token: string) => {
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  if (apolloClientCache) {
    return apolloClientCache;
  } else {
    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(cacheOptions),
    });
    apolloClientCache = client;
    return apolloClientCache;
  }
};

export default client;
