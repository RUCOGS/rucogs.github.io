import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProcessMonitor } from '@src/app/classes/process-monitor';
import { BackendService } from '@src/app/services/backend.service';
import { deepClone } from '@src/app/utils/utils';
import { Project, ProjectInvite } from '@src/generated/graphql-endpoint.types';
import { gql } from 'apollo-angular';
import { PartialDeep } from 'type-fest';
import { DefaultProjectOptions, ProjectOptions } from '../project-page/project-page.component';

@Component({
  selector: 'app-invites-tab',
  templateUrl: './invites-tab.component.html',
  styleUrls: ['./invites-tab.component.css']
})
export class InvitesTabComponent implements OnInit, OnChanges {

  @Output() edited = new EventEmitter();

  @Input() project: PartialDeep<Project> = {};
  @Input() projectOptions: ProjectOptions = DefaultProjectOptions;

  monitor = new ProcessMonitor();
  displayedColumns: string[] = ['user', 'type', 'buttons'];
  filteredInvites: PartialDeep<ProjectInvite>[] = [];

  constructor(
    private backend: BackendService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project']) {
      if (this.project.invites)
        this.filteredInvites = deepClone(this.project.invites) as PartialDeep<ProjectInvite>[];
    }
  }
  
  onNewSearchRequest(searchText: string) {
    if (searchText === "") {
      this.filteredInvites = deepClone(this.project.invites) as PartialDeep<ProjectInvite>[];
    } else {
      this.filteredInvites = (this.project.invites as PartialDeep<ProjectInvite>[])!.filter(x => x.user!.username!.indexOf(searchText) > -1);
      this.filteredInvites = this.filteredInvites.sort((a, b) => { return b.user!.username!.indexOf(searchText) - a.user!.username!.indexOf(searchText); });
    }
  }

  async onAcceptInvite(invite: PartialDeep<ProjectInvite>) {
    if (this.monitor.isProcessing)
      return;
    this.monitor.addProcess();
    const result = await this.backend.withAuth().mutate<boolean>({
      mutation: gql`
        mutation AcceptProjectInvite($inviteId: ID!) {
          acceptProjectInvite(inviteId: $inviteId)
        }
      `,
      variables: {
        inviteId: invite.id
      }
    }).toPromise();
    this.monitor.removeProcess();
    if (result.errors)
      return;
    
    this.edited.emit();
  }

  async onRejectInvite(invite: PartialDeep<ProjectInvite>) {
    if (this.monitor.isProcessing)
      return;
    this.monitor.addProcess();
    const result = await this.backend.withAuth().mutate<boolean>({
      mutation: gql`
        mutation RejectProjectInvite($inviteId: ID!) {
          deleteProjectInvite(inviteId: $inviteId)
        }
      `,
      variables: {
        inviteId: invite.id
      }
    }).toPromise();
    this.monitor.removeProcess();
    if (result.errors)
      return;
    
    this.edited.emit();
  }
}
