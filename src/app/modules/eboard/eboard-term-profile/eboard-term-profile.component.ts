import { Component, Input, OnInit } from '@angular/core';
import { CdnService } from '@src/app/services/cdn.service';
import { EBoardTerm, RoleCode } from '@src/generated/graphql-endpoint.types';
import { PartialDeep } from 'type-fest';

@Component({
  selector: 'app-eboard-term-profile',
  templateUrl: './eboard-term-profile.component.html',
  styleUrls: ['./eboard-term-profile.component.css'],
})
export class EBoardTermProfileComponent implements OnInit {
  @Input() term: PartialDeep<EBoardTerm> = {};

  constructor(public cdn: CdnService) {}

  ngOnInit(): void {}

  getEBoardTermRoles(term: PartialDeep<EBoardTerm> | undefined) {
    if (!term) return [];
    const roles = term.roles?.map((x) => x?.roleCode as RoleCode);
    if (!roles) return [];
    if (roles.length == 1) return roles;
    // Filter out the EBoard role if we have other roles assigned
    return roles.filter((x) => x !== RoleCode.Eboard);
  }
}
