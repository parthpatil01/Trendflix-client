// src/apolloClient.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// HTTP connection to the backend
const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_APP_API_URL}`, // Replace with your backend URL
});

// Add the Authorization header to requests
const authLink = setContext((_, { headers }) => {
  // Get the token from localStorage (or wherever you store it)
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create the Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain the auth link with the HTTP link
  cache: new InMemoryCache(),
});

export default client;