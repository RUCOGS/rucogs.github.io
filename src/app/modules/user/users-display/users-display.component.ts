import { AfterViewInit, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { FilterHeaderComponent } from '@src/app/modules/filtering/filtering.module';
import { BackendService } from '@src/app/services/backend.service';
import { ScrollService } from '@src/app/services/scroll.service';
import { User } from '@src/generated/graphql-endpoint.types';
import { UserFilterInput, UserSortInput } from '@src/generated/model.types';
import { gql } from 'apollo-angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-users-display',
  templateUrl: './users-display.component.html',
  styleUrls: ['./users-display.component.css']
})
export class UsersDisplayComponent implements AfterViewInit, OnDestroy {

  @ViewChild(FilterHeaderComponent) filterHeader: FilterHeaderComponent | undefined
  @Input() users: Partial<User>[] = [];
  

  currentPage: number = 0;
  usersPerPage: number = 40;
  filter: UserFilterInput = {};
  fillingPage: boolean = false;

  private onDestroy$ = new Subject<void>();

  // TODO MAYBE: Find the exact amount of users needed to fill
  //             the viewer's page. This ofcourse is dependent on
  //             a lot of factors, such as the current breakpoint, etc.

  constructor(
    private scrollService: ScrollService,
    private backend: BackendService,
  ) { 
    scrollService.scrolledToBottom$.pipe(takeUntil(this.onDestroy$)).subscribe(this.onScrollToBottom.bind(this));
    this.queryUntilFillPage();
  }
  
  ngAfterViewInit(): void {
    if (!this.filterHeader)
      return;
    
    // NOTE: This is really inefficient because we are regenerating the entire sortedSections array
    //       whenever the user changes a filter option. We should consider only modifying parts of
    //       of the sorted array that are needed (ie. only reversing the sortedSections if sortAscending 
    //       changes).
    this.filterHeader.newSearchRequest$.pipe(takeUntil(this.onDestroy$)).subscribe(this.onNewSearchRequest.bind(this));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  async queryUntilFillPage(filter: UserFilterInput | undefined = undefined) {
    if (this.fillingPage)
      return;
    this.fillingPage = true;
    let resultsLength: number = 0;
    this.scrollService.updateScrollData();
    const ogPos = this.scrollService.position;
    do {
      resultsLength = await this.addPage(filter);
      // While we haven't filled up the page and there are more users,
      // then we continue querying to fill up the page
      this.scrollService.updateScrollData();
    } while (this.scrollService.maxPosition - ogPos < 300 && resultsLength > 0);
    this.fillingPage = false;
  }

  async onScrollToBottom() {
    await this.queryUntilFillPage();
  }

  async addPage(filter: UserFilterInput | undefined = undefined) {
    const result = await this.queryUsers(filter);
    if (result.length == 0)
      return 0;
    
    this.users = this.users.concat(result);
    this.currentPage++;
    return result.length;
  }

  async queryUsers(filter: UserFilterInput | undefined = undefined) {
    if (filter !== undefined)
      this.filter = filter;
    const results = await this.backend.withAuth().query<{
      users: {
        // Result type
        avatarLink: string, 
        displayName: string,
        username: string,
        bio: string,
      }[]
    }>({
      query: gql`
        query($filter: UserFilterInput, $limit: Int, $skip: Int, $sorts: [UserSortInput!]) {
          users(filter: $filter, limit: $limit, skip: $skip, sorts: $sorts) {
            avatarLink
            displayName
            username
          }
        }
      `,
      variables: {
        // Pagination
        // TODO EVENTUALLY: Use cursor pagination once Typetta suppoorts that
        skip: this.currentPage * this.usersPerPage,
        limit: this.usersPerPage,
        filter: this.filter,
        sorts: [
          <UserSortInput>{
            username: 'asc'
          }
        ]
      }
    }).toPromise();
    
    if (results.error)
      return [];
    return results.data.users;
  }

  resetPages() {
    this.users = [];
    this.currentPage = 0;
  }

  async onNewSearchRequest(searchText: string) {
    if (this.filterHeader === undefined)
      return;
    
    searchText = searchText.toLowerCase();
    
    this.resetPages();

    if (searchText === "") {
      await this.queryUntilFillPage({});
      return;
    }

    await this.queryUntilFillPage({
      or_: [
        {
          username: { 
            startsWith: searchText, 
            mode: 'INSENSITIVE' 
          }
        },
        {
          displayName: {
            startsWith: searchText,
            mode: 'INSENSITIVE'
          }
        }
      ],
    });
  }
}