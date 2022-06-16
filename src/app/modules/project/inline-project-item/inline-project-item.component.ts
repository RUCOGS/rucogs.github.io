import { Component, Input, OnInit } from '@angular/core';
import { CdnService } from '@src/app/services/cdn.service';
import { Project } from '@src/generated/graphql-endpoint.types';
import { PartialDeep } from 'type-fest';

@Component({
  selector: 'app-inline-project-item',
  templateUrl: './inline-project-item.component.html',
  styleUrls: ['./inline-project-item.component.css']
})
export class InlineProjectItemComponent implements OnInit {
  
  @Input() project: PartialDeep<Project> = {};
  
  constructor(
    public cdn: CdnService
  ) { }

  ngOnInit(): void {
  }

}
