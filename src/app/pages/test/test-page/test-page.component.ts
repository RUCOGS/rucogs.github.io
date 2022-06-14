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
    console.log("Trigger start");
    await this.backend.mutate({
      mutation: gql`
        mutation TriggerTestSubscription {
          test
        }
      `
    }).toPromise();
    console.log("Trigger end!");
  }

  testSubscription() {
    this.backend.subscribe({
      query: gql`
        subscription TestSubscription($filter: TestSubscriptionFilter){
          test(filter: $filter) {
            joe
            mama
          }
        } 
      `,
      variables: {
        filter: <TestSubscriptionFilter>{
          id: "joes",
          someField: "I have data!"
        }
      }
    }).pipe(takeUntil(this.onDestroy$))
    .subscribe({
      next: (value) => {
        console.log("Sub got obj:");
        console.log(value.data);
      }
    });
    console.log("Test subscription subscribed!");
  }

}
