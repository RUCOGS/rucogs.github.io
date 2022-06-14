import { NgModule } from '@angular/core';
import { InMemoryCache, split } from '@apollo/client/core';
import { getMainDefinition } from '@apollo/client/utilities';
import { SettingsService } from '@src/_settings';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { createUploadLink } from 'apollo-upload-client';
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

export function createApollo(settings: SettingsService) {
  const baseGraphQLUri = settings.Backend.backendApiBaseLink + '/api/graphql';
  
  const uploadLink = createUploadLink({ 
    uri: `http://${baseGraphQLUri}`,
    headers: { 'Apollo-Require-Preflight': 'true' }
  });

  const webSocketLink = new GraphQLWsLink(
    createClient({
      url: `ws://${baseGraphQLUri}`
    })
  );

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const splitLink = split(
    // split based on operation type
    ({query}) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
      );
    },
    webSocketLink,
    uploadLink,
  );

  return {
    link: splitLink,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [SettingsService],
    },
  ],
})
export class GraphQLModule {}
