import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat } from '@apollo/client';
import fetch from 'isomorphic-unfetch';

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

const httpLink = new HttpLink({ uri: `http://${process.env.API_HOST}/${process.env.API_PATH}` });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: `Bearer ${localStorage.getItem('authToken')}`,
    }
  });

  return forward(operation);
});

export function createApolloClient() {
  return new ApolloClient({
    ssrMode: false,
    link: concat(authMiddleware, httpLink),
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
