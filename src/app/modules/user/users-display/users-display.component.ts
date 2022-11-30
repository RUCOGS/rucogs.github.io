import { Component, Input } from '@angular/core';
import { BaseFilteredHeaderScrollPaginationComponent } from '@app/modules/paginator/paginator.module';
import { User } from '@src/generated/graphql-endpoint.types';
import { UserFilterInput, UserSortInput } from '@src/generated/model.types';
import { gql } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-users-display',
  templateUrl: './users-display.component.html',
  styleUrls: ['./users-display.component.css'],
})
export class UsersDisplayComponent extends BaseFilteredHeaderScrollPaginationComponent<Partial<User>, UserFilterInput> {
  get users() {
    return this.values;
  }
  @Input() set users(values) {
    this.values = values;
  }

  get usersQuery() {
    return this.filteredValuesQuery;
  }
  @Input() set usersQuery(value) {
    this.filteredValuesQuery = value;
  }

  valuesPerPage: number = 18;

  getFilter(): UserFilterInput {
    if (!this.filterHeader) return {};

    return {
      ...(this.filterHeader.searchText && {
        or_: [
          {
            username: {
              startsWith: this.filterHeader.searchText,
              mode: 'INSENSITIVE',
            },
          },
          {
            displayName: {
              startsWith: this.filterHeader.searchText,
              mode: 'INSENSITIVE',
            },
          },
        ],
      }),
    };
  }

  _filteredValuesQuery = async (filter: UserFilterInput, skip: number, limit: number) => {
    const sortAscending = this.filterHeader?.sortAscending ?? false;
    const sortAscendingText = sortAscending ? 'asc' : 'desc';
    const sortingMode = this.filterHeader?.sortingMode ?? 'classYear';

    const results = await firstValueFrom(
      this.backend.withAuth().query<{
        users: any[];
      }>({
        query: gql`
          query DisplayUsers($filter: UserFilterInput, $limit: Int, $skip: Int, $sorts: [UserSortInput!]) {
            users(filter: $filter, limit: $limit, skip: $skip, sorts: $sorts) {
              avatarLink
              bannerLink
              netId
              classYear
              bio
              displayName
              username
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
            <UserSortInput>{
              ...(sortingMode === 'name' && { displayName: sortAscendingText }),
              ...(sortingMode === 'username' && { username: sortAscendingText }),
              ...(sortingMode === 'classYear' && { classYear: sortAscendingText }),
            },
          ],
        },
        fetchPolicy: 'no-cache',
      }),
    );

    if (results.error) return [];
    return results.data.users;
  };
}
