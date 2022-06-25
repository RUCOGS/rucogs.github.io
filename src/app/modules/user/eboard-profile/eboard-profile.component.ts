import { Component, Input, OnInit } from '@angular/core';
import { CdnService } from '@src/app/services/cdn.service';
import { EBoard } from '@src/generated/graphql-endpoint.types';
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

}
