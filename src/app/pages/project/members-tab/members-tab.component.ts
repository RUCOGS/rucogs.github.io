import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { FilterHeaderComponent } from '@src/app/modules/filtering/filtering.module';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { BackendService, BreakpointManagerService, CdnService, SecurityService } from '@src/app/services/_services.module';
import { compare, deepClone } from '@src/app/utils/utils';
import { Permission, Project, ProjectMember, RoleCode } from '@src/generated/graphql-endpoint.types';
import { gql } from 'apollo-angular';
import { firstValueFrom, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { PartialDeep } from 'type-fest';
import { EditMemberDialogComponent, EditMemberDialogData } from '../edit-member-dialog/edit-member-dialog.component';
import { defaultProjectOptions, ProjectOptions } from '../project-page/project-page.component';

@Component({
  selector: 'app-members-tab',
  templateUrl: './members-tab.component.html',
  styleUrls: ['./members-tab.component.css']
})
export class MembersTabComponent implements AfterViewInit, OnDestroy, OnChanges {

  @Output() edited = new EventEmitter();

  @Input() project: PartialDeep<Project> = {};
  @Input() projectOptions: ProjectOptions = defaultProjectOptions();

  @ViewChild('membersFilter') filterHeader: FilterHeaderComponent | undefined

  displayedColumns = ['member', 'buttons'];  
  filteredProjectMembers: PartialDeep<ProjectMember>[] = [];

  protected onDestroy$ = new Subject<void>();

  constructor(
    public cdn: CdnService,
    public breakpointManager: BreakpointManagerService,
    private backend: BackendService,
    private security: SecurityService,
    private uiMessage: UIMessageService,
    private dialog: MatDialog,
  ) { }

  ngAfterViewInit(): void {
    if (!this.filterHeader)
      return;
    
    // NOTE: This is really inefficient because we are regenerating the entire sortedSections array
    //       whenever the project changes a filter option. We should consider only modifying parts of
    //       of the sorted array that are needed (ie. only reversing the sortedSections if sortAscending 
    //       changes).
    this.filterHeader.newSearchRequest$.pipe(takeUntil(this.onDestroy$)).subscribe(this.onNewSearchRequest.bind(this));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project']) {
      if (this.project.members)
        this.filteredProjectMembers = deepClone(this.project.members) as PartialDeep<ProjectMember>[];
    }
  }

  getUserMember() {
    return this.project.members?.find(x => x?.user?.id === this.security.securityContext?.userId) ?? {};
  }

  onNewSearchRequest(searchText: string) {
    if (searchText === "") {
      this.filteredProjectMembers = deepClone(this.project.members) as PartialDeep<ProjectMember>[];
    } else {
      this.filteredProjectMembers = (this.project.members as PartialDeep<ProjectMember>[])!.filter(x => x!.user!.username!.indexOf(searchText) > -1);
      this.filteredProjectMembers = this.filteredProjectMembers.sort((a, b) => { return b.user!.username!.indexOf(searchText) - a.user!.username!.indexOf(searchText); });
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  async onEdit(member: PartialDeep<ProjectMember> | undefined) {
    const result = await this.dialog.open(EditMemberDialogComponent, {
      data: <EditMemberDialogData> {
        projectMember: member,
        projectId: this.project.id
      },
      width: "37.5em",
      maxWidth: '90vw',
    }).afterClosed().toPromise();
    if (result)
      this.edited.emit();
  }

  async onKick(member: PartialDeep<ProjectMember> | undefined) {
    const confirmed = await this.uiMessage.confirmDialog(`Are you sure you want to kick "${member?.user?.displayName}" (@${member?.user?.username})?`)
      .pipe(first())
      .toPromise();
    if (confirmed) {
      const result = await firstValueFrom(this.backend.withAuth()
        .mutate<boolean>({
          mutation: gql`
            mutation KickMember($id: ID!) {
              deleteProjectMember(id: $id)
            }
          `,
          variables: {
            id: member?.id
          }
        }));
      if (result.errors || !result.data)
        return;
      this.edited.emit();
    }
  }

  getPermsData(member: PartialDeep<ProjectMember> | undefined): PermsData {
    if (!member || !member.id || !this.project.members)
      return {
        canKickMember: false,
        canUpdateMember: false,
        kickMemberTooltip: "",
        updateMemberTooltip: ""
      }
    
    let canUpdateMember = true;
    let updateMemberTooltip = "";

    if (!this.security.makePermCalc()
      .withDomain({
        projectMemberId: [ member.id ]
      })
      .hasPermission(Permission.ManageProjectMember)
    ) {
      canUpdateMember = false;
      updateMemberTooltip = "Insufficient permissions"; 
    }

    let canKickMember = true;
    let kickMemberTooltip = "";
    if (!canUpdateMember) {
      canKickMember = false;
      kickMemberTooltip = "Insufficient permissions";
    }
    if (this.project.members.length === 1) {
      canKickMember = false;
      kickMemberTooltip = "Project must have at least one member";
    }
    if (member.roles?.some(x => x?.roleCode === RoleCode.ProjectOwner)) {
      canKickMember = false;
      kickMemberTooltip = "Cannot kick the owner until ownership is transferred!";
    }

    return {
      canUpdateMember,
      canKickMember,
      kickMemberTooltip,
      updateMemberTooltip,
    }
  }

  onInvitesEdited() {
    this.edited.emit();
  }
  
  sortData(sort: Sort) {
    const data = this.filteredProjectMembers.slice();
    if (!sort.active || sort.direction === '') {
      this.filteredProjectMembers = data;
      return;
    }

    this.filteredProjectMembers = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'member':
          return compare(a.user?.username, b.user?.username, isAsc);
        default:
          return 0;
      }
    });
  }
}

type PermsData = {
  canUpdateMember: boolean
  canKickMember: boolean
  kickMemberTooltip: string
  updateMemberTooltip: string
}