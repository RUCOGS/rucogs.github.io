import {NgModule} from '@angular/core';
import {Apollo, ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import {ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { AuthService } from '@app/services/auth.service';
import { onError } from '@apollo/client/link/error';
import { TokenStorageService } from '@app/services/token-storage.service';

export function createApollo(httpLink: HttpLink, authService: AuthService) {

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        Authorization: 'Bearer ' + authService.getToken()
      }
    });
    return forward(operation);
  });

  const errorLink = onError(({ forward, graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => {
        if (message.toLowerCase().includes("Token unauthorized: ")) {
          authService.logout();
        }
      });
    }
  });

  return {
    link: errorLink.concat(authLink.concat(httpLink.create({ uri: 'http://localhost:8080/api/graphql' }))),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, AuthService],
    },
  ],
})
export class GraphQLModule {}
