import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import { ApolloLink } from "@apollo/client/core";
import { onError } from "@apollo/link-error";
import { createUploadLink } from "apollo-upload-client";
import { endpoint } from "../config";
import { getDataFromTree } from '@apollo/client/react/ssr';
import withApollo from 'next-with-apollo';

function createClient({ headers, initialState }) {
  return new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(`[GraphQL error]:Message :${message}, Locations:${locations},Path :${path}`)
          );
        if (networkError)
          console.log(
            `[Network error]: ${networkError} .Backend is unreachable. Is it running?`
          );
      }),
      createUploadLink({
        uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
        fetchOptions: {
          credential: 'include'
        },
        headers
      }),
    ]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            //TODO : we will add this together
            ///allProducts: paginationField()
          }
        }
      }
    }).restore(initialState || {})
  });
}

export default withApollo(createClient, { getDataFromTree });