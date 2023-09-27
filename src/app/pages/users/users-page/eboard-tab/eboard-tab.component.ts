import { Component, Input } from '@angular/core';
import { EBoardTermGroup } from '@src/app/modules/eboard/eboard.module';
import { BaseScrollPaginationComponent } from '@src/app/modules/paginator/paginator.module';
import { EBoardTerm, RoleCode } from '@src/generated/graphql-endpoint.types';
import { EBoardTermSortInput } from '@src/generated/model.types';
import { gql } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';
import { PartialDeep } from 'type-fest';
import { PartialObjectDeep } from 'type-fest/source/partial-deep';

@Component({
  selector: 'app-eboard-tab',
  templateUrl: './eboard-tab.component.html',
  styleUrls: ['./eboard-tab.component.css'],
})
export class EboardTabComponent extends BaseScrollPaginationComponent<PartialDeep<EBoardTerm>> {
  get eBoardTerms() {
    return this.values;
  }
  @Input() set eBoardTerms(values) {
    this.values = values;
  }

  get values() {
    return super.values;
  }
  set values(values: PartialObjectDeep<EBoardTerm>[]) {
    super.values = values;

    // Sync the term groups with the values
    this.updateEBoardTermGroups();
  }

  eBoardTermGroups: EBoardTermGroup[] = [];

  valuesPerPage: number = 18;

  _valuesQuery = async (skip: number, limit: number) => {
    const results = await firstValueFrom(
      this.backend.withAuth().query<{
        eBoardTerms: {
          eBoard: any;
          id: string;
          year: number;
          roles: {
            roleCode: RoleCode;
          }[];
        }[];
      }>({
        query: gql`
          query DisplayEBoardTerms($limit: Int, $skip: Int, $sorts: [EBoardTermSortInput!]) {
            eBoardTerms(limit: $limit, skip: $skip, sorts: $sorts) {
              eBoard {
                id
                avatarLink
                bio
                user {
                  id
                  avatarLink
                  bannerLink
                  netId
                  classYear
                  bio
                  displayName
                  username
                }
              }
              id
              year
              roles {
                roleCode
              }
            }
          }
        `,
        variables: {
          skip,
          limit,
          sorts: [
            <EBoardTermSortInput>{
              year: 'desc',
            },
          ],
        },
        fetchPolicy: 'cache-first',
      }),
    );

    if (results.error) return [];
    return results.data.eBoardTerms;
  };

  updateEBoardTermGroups() {
    // We know eBoardTerms are sorted from most recent to oldest year

    this.eBoardTermGroups = [];

    let currentGroup = <EBoardTermGroup>{
      year: 0,
      terms: [],
    };
    for (const term of this.eBoardTerms) {
      if (term.year !== currentGroup.year) {
        const newGroup = <EBoardTermGroup>{
          year: term.year,
          terms: [],
        };
        this.eBoardTermGroups.push(newGroup);
        currentGroup = newGroup;
      }
      currentGroup.terms.push(term);
    }
  }

  getEBoardTermRoles(term: PartialDeep<EBoardTerm> | undefined) {
    if (!term) return [];
    const roles = term.roles?.map((x) => x?.roleCode as RoleCode);
    if (!roles) return [];
    if (roles.length == 1) return roles;
    // Filter out the EBoard role if we have other roles assigned
    return roles.filter((x) => x !== RoleCode.Eboard);
  }
}
