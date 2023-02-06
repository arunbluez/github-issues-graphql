import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

let apolloClientCache: ApolloClient<NormalizedCacheObject>;

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
});

export const getGqlEdgeClient = () => {
  const authLink = setContext((_, { headers }) => {
    const token = process.env.GITHUB_ACCESS_TOKEN;
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
      cache: new InMemoryCache(),
    });
    apolloClientCache = client;
    return apolloClientCache;
  }
};
