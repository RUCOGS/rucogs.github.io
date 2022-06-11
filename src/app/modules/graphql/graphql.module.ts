import { NgModule } from '@angular/core';
import { InMemoryCache } from '@apollo/client/core';
import { AuthService } from '@app/services/auth.service';
import { SettingsService } from '@src/_settings';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { createUploadLink } from 'apollo-upload-client';

export function createApollo(httpLink: HttpLink, settings: SettingsService) {
  return {
    link: createUploadLink({ 
      uri: settings.Backend.backendApiLink + '/api/graphql',
      headers: { 'Apollo-Require-Preflight': 'true' }
    }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, SettingsService],
    },
  ],
})
export class GraphQLModule {}
