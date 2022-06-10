import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { AuthService } from '@app/services/auth.service';
import { onError } from '@apollo/client/link/error';
import { SettingsService } from '@src/_settings';
import { createUploadLink } from 'apollo-upload-client'

export interface ApolloContext {
  authenticate?: boolean
}

export function createApollo(httpLink: HttpLink, authService: AuthService, settings: SettingsService) {
  const authLink = new ApolloLink((operation, forward) => {
    const context = operation.getContext() as ApolloContext;
    if (context.authenticate && authService.authenticated) {
      operation.setContext({
        headers: {
          Authorization: 'Bearer ' + authService.getToken()
        }
      });
    }
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
    link: errorLink.concat(authLink.concat(createUploadLink({ 
      uri: settings.Backend.backendApiLink + '/api/graphql',
      headers: { 'Apollo-Require-Preflight': 'true' }
    }))),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, AuthService, SettingsService],
    },
  ],
})
export class GraphQLModule {}
