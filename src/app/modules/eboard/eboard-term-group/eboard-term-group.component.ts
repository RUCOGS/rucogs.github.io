import { Component, Input, OnInit } from '@angular/core';
import { EBoardTerm } from '@src/generated/graphql-endpoint.types';
import { PartialDeep } from 'type-fest';

export interface EBoardTermGroup {
  year: number;
  terms: PartialDeep<EBoardTerm>[];
}

@Component({
  selector: 'app-eboard-term-group',
  templateUrl: './eboard-term-group.component.html',
  styleUrls: ['./eboard-term-group.component.css'],
})
export class EBoardTermGroupComponent implements OnInit {
  @Input() group: EBoardTermGroup = {
    year: 0,
    terms: [],
  };

  constructor() {}

  ngOnInit(): void {}
}
