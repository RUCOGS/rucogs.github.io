import { Component, Input, OnInit } from '@angular/core';
import { CdnService } from '@src/app/services/cdn.service';
import { User } from '@src/generated/graphql-endpoint.types';
import { PartialDeep } from 'type-fest';

@Component({
  selector: 'app-inline-options-profile',
  templateUrl: './inline-options-profile.component.html',
  styleUrls: ['./inline-options-profile.component.css']
})
export class InlineOptionsProfileComponent implements OnInit {

  @Input() user: PartialDeep<User> = {};

  constructor(public cdn: CdnService) { }

  ngOnInit(): void {
  }

}
