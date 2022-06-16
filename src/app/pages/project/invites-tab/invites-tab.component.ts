import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { ProcessMonitor } from '@src/app/classes/process-monitor';
import { FilterHeaderComponent } from '@src/app/modules/filtering/filtering.module';
import { BackendService } from '@src/app/services/backend.service';
import { BreakpointManagerService } from '@src/app/services/breakpoint-manager.service';
import { compare, deepClone } from '@src/app/utils/utils';
import { Project, ProjectInvite, ProjectInviteSubscriptionFilter } from '@src/generated/graphql-endpoint.types';
import { gql } from 'apollo-angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PartialDeep } from 'type-fest';
import { InviteUserDialogComponent, InviteUserDialogData } from '../invite-user-dialog/invite-user-dialog.component';
import { DefaultProjectOptions, ProjectOptions } from '../project-page/project-page.component';

@Component({
  selector: 'app-invites-tab',
  templateUrl: './invites-tab.component.html',
  styleUrls: ['./invites-tab.component.css']
})
export class InvitesTabComponent implements OnChanges, OnDestroy, AfterViewInit {

  @Output() edited = new EventEmitter();

  @Input() project: PartialDeep<Project> = {};
  @Input() projectOptions: ProjectOptions = DefaultProjectOptions;

  @ViewChild(FilterHeaderComponent) filterHeader: FilterHeaderComponent | undefined
  
  monitor = new ProcessMonitor();
  displayedColumns: string[] = ['user', 'type', 'buttons'];
  filteredInvites: PartialDeep<ProjectInvite>[] = [];

  protected onDestroy$ = new Subject();

  constructor(
    private backend: BackendService,
    private breakpointManager: BreakpointManagerService,
    private dialog: MatDialog,
  ) { }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project']) {
      this.monitor.removeProcess();
      if (this.project.invites)
        this.filteredInvites = deepClone(this.project.invites) as PartialDeep<ProjectInvite>[];
    }
  }

  ngAfterViewInit(): void {
    if (!this.filterHeader)
      return;
    
    this.filterHeader.newSearchRequest$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(this.onNewSearchRequest.bind(this));
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

    if (result.errors)
      return;
    
    // Handled by subscription instead
    // this.edited.emit();
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

    if (result.errors)
      return;
    
    // Handled by subscription instead
    // this.edited.emit();
  }

  async invite() {
    const result = await this.dialog.open(InviteUserDialogComponent, {
      data: <InviteUserDialogData>{
        project: this.project
      },
      width: "25em"
    }).afterClosed().toPromise();
    
    if (result)
      this.edited.emit();
  }

  sortData(sort: Sort) {
    const data = this.filteredInvites.slice();
    if (!sort.active || sort.direction === '') {
      this.filteredInvites = data;
      return;
    }

    this.filteredInvites = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'user':
          return compare(a.user?.username, b.user?.username, isAsc);
        case 'type':
          return compare(a.type, b.type, isAsc);
        default:
          return 0;
      }
    });
  }
}
