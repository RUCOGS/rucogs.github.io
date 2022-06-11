import { AfterViewInit, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { FilterHeaderComponent } from '@src/app/modules/filtering/filter-header/filter-header.component';
import { BackendService } from '@src/app/services/backend.service';
import { ScrollService } from '@src/app/services/scroll.service';
import { Project, ProjectFilterInput, ProjectSortInput } from '@src/generated/graphql-endpoint.types';
import { gql } from 'apollo-angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-projects-display',
  templateUrl: './projects-display.component.html',
  styleUrls: ['./projects-display.component.css'],
  host: {
    class: 'page'
  }
})
export class ProjectsDisplayComponent implements AfterViewInit, OnDestroy {

  @ViewChild(FilterHeaderComponent) filterHeader: FilterHeaderComponent | undefined
  @Input() projects: Partial<Project>[] = [];
  @Input() projectsQuery: (filter: any, skip: number, limit: number) => Promise<Partial<Project>[]> = this.defaultQuery.bind(this);
  
  currentPage: number = 0;
  projectsPerPage: number = 6;
  filter: ProjectFilterInput = {};
  fillingPage: boolean = false;

  private onDestroy$: Subject<void> = new Subject<void>();


  // TODO MAYBE: Find the exact amount of projects needed to fill
  //             the viewer's page. This ofcourse is dependent on
  //             a lot of factors, such as the current breakpoint, etc.

  constructor(
    private scrollService: ScrollService,
    private backend: BackendService,
  ) { 
    scrollService.scrolledToBottom$.pipe(takeUntil(this.onDestroy$)).subscribe(this.onScrollToBottom.bind(this));
  }

  ngAfterViewInit(): void {
    if (!this.filterHeader)
      return;
    
    // NOTE: This is really inefficient because we are regenerating the entire sortedSections array
    //       whenever the project changes a filter option. We should consider only modifying parts of
    //       of the sorted array that are needed (ie. only reversing the sortedSections if sortAscending 
    //       changes).
    this.filterHeader.newSearchRequest$.pipe(takeUntil(this.onDestroy$)).subscribe(this.onNewSearchRequest.bind(this));
    this.queryUntilFillPage();
  }
  
  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  async queryUntilFillPage(filter: ProjectFilterInput | undefined = undefined) {
    if (this.fillingPage)
      return;
    this.fillingPage = true;
    let resultsLength: number = 0;
    this.scrollService.updateScrollData();
    const ogPos = this.scrollService.position;
    do {
      resultsLength = await this.addPage(filter);
      // While we haven't filled up the page and there are more projects,
      // then we continue querying to fill up the page
      this.scrollService.updateScrollData();
    } while (this.scrollService.maxPosition - ogPos < 300 && resultsLength > 0);
    this.fillingPage = false;
  }

  async onScrollToBottom() {
    await this.queryUntilFillPage();
  }

  async addPage(filter: ProjectFilterInput | undefined = undefined) {
    const result = await this.queryProjects(filter);
    if (result.length == 0)
      return 0;
    
    this.projects = this.projects.concat(result);
    this.currentPage++;
    return result.length;
  }

  async queryProjects(filter: ProjectFilterInput | undefined = undefined) {
    if (filter !== undefined)
      this.filter = filter;
    const results = await this.projectsQuery(this.filter, this.currentPage, this.projectsPerPage);
    return results;
  }

  async defaultQuery(filter: any, skip: number, limit: number) {
    const results = await this.backend.withAuth().query<{
      projects: {
        // Result type
        id: string,
        cardImageLink: string,
        completedAt: Date,
        createdAt: Date,
        updatedAt: Date,
        name: string,
        pitch: string,
        downloadLinks: string[],
        members: {
          user: {
            avatarLink: string
          }
        }[]
      }[]
    }>({
      query: gql`
        query($filter: ProjectFilterInput, $skip: Int, $limit: Int, $sorts: [ProjectSortInput!]) {
          projects(filter: $filter, skip: $skip, limit: $limit, sorts: $sorts) {
            id
            cardImageLink
            completedAt
            createdAt
            updatedAt
            name
            pitch
            downloadLinks
            members {
              user {
                avatarLink
              }
            }
          }
        }
      `,
      variables: {
        // Pagination
        // TODO EVENTUALLY: Use cursor pagination once Typetta suppoorts that
        skip,
        limit,
        filter,
        sorts: [
          <ProjectSortInput>{
            name: 'asc'
          }
        ]
      }
    }).toPromise();
    if (results.error)
      return [];
    return <Partial<Project>[]>results.data.projects;
  }

  resetPages() {
    this.projects = [];
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
      name: { 
        startsWith: searchText, 
        mode: 'INSENSITIVE' 
      }
    });
  }
}