import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import { InMemoryCache } from 'apollo-cache-inmemory'

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore'
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  }
};

export function createApolloClient() {
  return new ApolloClient({
    ssrMode: false,
    link: new HttpLink({
      uri: `http://${process.env.HOST_URL}${process.env.API_PATH}`,
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      fetch
    }),
    fetchOptions: {
      mode: 'no-cors',
    },
    cache: new InMemoryCache(),
    defaultOptions,
    request: (operation) => {
      const token = localStorage.getItem('token');
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : ''
        }
      });
    }
  });
}
