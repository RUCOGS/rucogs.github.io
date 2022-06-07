import { Component, Input, OnInit } from '@angular/core';
import { CdnService } from '@src/app/services/cdn.service';
import { User } from '@src/generated/graphql-endpoint.types';
import { PartialDeep } from 'type-fest';

@Component({
  selector: 'app-inline-profile',
  templateUrl: './inline-profile.component.html',
  styleUrls: ['./inline-profile.component.css']
})
export class InlineProfileComponent implements OnInit {

  @Input() user: PartialDeep<User> = {};

  constructor(
    public cdn: CdnService
  ) { }

  ngOnInit(): void {
  }

}
