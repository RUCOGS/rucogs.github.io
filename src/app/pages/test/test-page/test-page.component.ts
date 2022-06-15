import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from '@src/app/services/_services.module';
import { TestSubscriptionFilter } from '@src/generated/graphql-endpoint.types';
import { gql } from 'apollo-angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit, OnDestroy {

  private onDestroy$ = new Subject();

  constructor(
    private backend: BackendService
  ) { }

  ngOnInit(): void {
    this.testSubscription();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  async triggerTestSubscription() {
    await this.backend.mutate({
      mutation: gql`
        mutation TriggerTestSubscription {
          test
        }
      `
    }).toPromise();
  }

  testSubscription() {
    this.backend.rebuildClient();
    this.backend.subscribe({
      query: gql`
        subscription TestSubscription($filter: TestSubscriptionFilter){
          test(filter: $filter) {
            joe
            mama
          }
        } 
      `,
      context: {
        thisIsInContext: "hey"
      },
      variables: {
        filter: <TestSubscriptionFilter>{
          id: "joes",
          someField: "I have data!"
        }
      }
    }).pipe(takeUntil(this.onDestroy$))
    .subscribe({
      next: (value) => {
      }
    });
  }

}
