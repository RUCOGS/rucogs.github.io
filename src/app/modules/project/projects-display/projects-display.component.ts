import { Component, Input } from '@angular/core';
import { BaseFilteredHeaderScrollPaginationComponent } from '@app/modules/paginator/paginator.module';
import { Access, Project } from '@src/generated/graphql-endpoint.types';
import { ProjectFilterInput, ProjectSortInput } from '@src/generated/model.types';
import { gql } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-projects-display',
  templateUrl: './projects-display.component.html',
  styleUrls: ['./projects-display.component.css'],
  host: {
    class: 'page',
  },
})
export class ProjectsDisplayComponent extends BaseFilteredHeaderScrollPaginationComponent<
  Partial<Project>,
  ProjectFilterInput
> {
  get projects() {
    return this.values;
  }
  @Input() set projects(values) {
    this.values = values;
  }

  get projectsQuery() {
    return this.filteredValuesQuery;
  }
  @Input() set projectsQuery(value) {
    this.filteredValuesQuery = value;
  }

  valuesPerPage: number = 6;

  override getFilter(): ProjectFilterInput {
    if (!this.filterHeader) return {};
    return {
      ...(this.filterHeader.searchText && {
        name: {
          startsWith: this.filterHeader.searchText,
          mode: 'INSENSITIVE',
        },
      }),
    };
  }

  _filteredValuesQuery = async (filter: ProjectFilterInput, skip: number, limit: number) => {
    const results = await firstValueFrom(
      this.backend.withAuth().query<{
        projects: {
          // Result type
          id: string;
          access: Access;
          cardImageLink: string;
          completedAt: Date;
          createdAt: Date;
          updatedAt: Date;
          name: string;
          pitch: string;
          downloadLinks: string[];
          members: {
            user: {
              avatarLink: string;
            };
          }[];
        }[];
      }>({
        query: gql`
          query DefaultProjectsDisplay(
            $filter: ProjectFilterInput
            $skip: Int
            $limit: Int
            $sorts: [ProjectSortInput!]
          ) {
            projects(filter: $filter, skip: $skip, limit: $limit, sorts: $sorts) {
              id
              access
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
              name: 'asc',
            },
          ],
        },
      }),
    );
    if (results.error) return [];
    return <Partial<Project>[]>results.data.projects;
  };
}
