import { Component, Input, OnInit } from '@angular/core';
import { CdnService } from '@src/app/services/cdn.service';
import { EBoard, RoleCode } from '@src/generated/graphql-endpoint.types';
import { PartialDeep } from 'type-fest';

@Component({
  selector: 'app-eboard-profile',
  templateUrl: './eboard-profile.component.html',
  styleUrls: ['./eboard-profile.component.css']
})
export class EboardProfileComponent implements OnInit {

  @Input() eBoard: PartialDeep<EBoard> = {};

  constructor(public cdn: CdnService) { }

  ngOnInit(): void {
  }

  hasRoles() {
    const currYear = new Date().getFullYear();
    return this.eBoard.terms?.find(x => x?.year === currYear) !== undefined;
  }

  getRoles() {
    const currYear = new Date().getFullYear();
    if (this.eBoard.terms && this.eBoard.terms.length > 0)
      return this.eBoard.terms.find(x => x?.year === currYear)?.roles?.map(x => x?.roleCode as RoleCode) ?? [];
    return [];
  }

  getEBoardReign() {
    const currYear = new Date().getFullYear();
    if (this.eBoard.terms && this.eBoard.terms.length > 0) {
      if (!this.eBoard.terms[0]?.year)
        return "";
      let minYear = this.eBoard.terms[0].year;
      let maxYear = this.eBoard.terms[0].year;
      for (const term of this.eBoard.terms) {
        if (!term?.year)
          continue;
        if (term.year < minYear)
          minYear = term.year;
        if (term.year > maxYear)
          maxYear = term.year;
      }
      return `${minYear} - ${maxYear}`;
    }
    return "";
  }
}
