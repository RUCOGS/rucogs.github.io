import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { FilterHeaderComponent } from '@src/app/modules/filtering/filtering.module';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import {
  BackendService,
  BreakpointManagerService,
  CdnService,
  SecurityService,
} from '@src/app/services/_services.module';
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
  styleUrls: ['./members-tab.component.css'],
})
export class MembersTabComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Output() edited = new EventEmitter();

  @Input() project: PartialDeep<Project> = {};
  @Input() projectOptions: ProjectOptions = defaultProjectOptions();

  @ViewChild('membersFilter') filterHeader: FilterHeaderComponent | undefined;

  displayedColumns = ['member', 'buttons'];
  filteredProjectMembers: PartialDeep<ProjectMember>[] = [];
  currentProjectOwner?: PartialDeep<ProjectMember>;

  protected onDestroy$ = new Subject<void>();

  constructor(
    public cdn: CdnService,
    public breakpointManager: BreakpointManagerService,
    private backend: BackendService,
    private security: SecurityService,
    private uiMessage: UIMessageService,
    private dialog: MatDialog,
  ) {}

  ngAfterViewInit(): void {
    if (!this.filterHeader) return;

    this.filterHeader.newSearchRequest$.pipe(takeUntil(this.onDestroy$)).subscribe(this.onNewSearchRequest.bind(this));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project']) {
      if (this.project.members)
        this.filteredProjectMembers = deepClone(this.project.members) as PartialDeep<ProjectMember>[];
      this.currentProjectOwner = this.project.members?.find((x) =>
        x?.roles?.some((x) => x?.roleCode === RoleCode.ProjectOwner),
      );
    }
  }

  getUserMember() {
    return this.project.members?.find((x) => x?.user?.id === this.security.securityContext?.userId) ?? {};
  }

  onNewSearchRequest(searchText: string) {
    if (searchText === '') {
      this.filteredProjectMembers = deepClone(this.project.members) as PartialDeep<ProjectMember>[];
    } else {
      this.filteredProjectMembers = (this.project.members as PartialDeep<ProjectMember>[])!.filter(
        (x) => x!.user!.username!.indexOf(searchText) > -1,
      );
      this.filteredProjectMembers = this.filteredProjectMembers.sort((a, b) => {
        return b.user!.username!.indexOf(searchText) - a.user!.username!.indexOf(searchText);
      });
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  async onEdit(member: PartialDeep<ProjectMember> | undefined) {
    const result = await firstValueFrom(
      this.dialog
        .open(EditMemberDialogComponent, {
          data: <EditMemberDialogData>{
            projectMember: member,
            projectId: this.project.id,
            projectMemberOptions: this.getProjectMemberOptions(member),
          },
          width: '37.5em',
          maxWidth: '90vw',
        })
        .afterClosed(),
    );
    if (result) this.edited.emit();
  }

  async onKick(member: PartialDeep<ProjectMember> | undefined) {
    let confirmText = `Are you sure you want to kick "${member?.user?.displayName}" (@${member?.user?.username})?`;
    if (member?.user?.id === this.security.securityContext?.userId)
      confirmText = `Are you sure you want to leave the project?`;
    const confirmed = await this.uiMessage.confirmDialog(confirmText).pipe(first()).toPromise();
    if (confirmed) {
      const result = await firstValueFrom(
        this.backend.withAuth().mutate<boolean>({
          mutation: gql`
            mutation KickMember($id: ID!) {
              deleteProjectMember(id: $id)
            }
          `,
          variables: {
            id: member?.id,
          },
        }),
      );
      if (result.errors || !result.data) return;
      this.edited.emit();
    }
  }

  getProjectMemberOptions(member: PartialDeep<ProjectMember> | undefined): ProjectMemberOptions {
    if (!member || !member.id || !this.project.members)
      return {
        canKickMember: false,
        canUpdateMember: false,
        canTransferOwnership: false,
        canManageMemberRoles: false,
        kickMemberTooltip: '',
        updateMemberTooltip: '',
        transferOwnershipTooltip: '',
      };

    const permsCalc = this.security.makePermCalc();

    let canUpdateMember = true;
    let updateMemberTooltip = '';
    if (
      !permsCalc
        .withDomain({
          projectMemberId: [member.id],
        })
        .hasPermission(Permission.ManageProjectMember)
    ) {
      canUpdateMember = false;
      updateMemberTooltip = 'Insufficient permissions';
    }

    let canTransferOwnership = true;
    let transferOwnershipTooltip = '';

    if (member.id === this.currentProjectOwner?.id) {
      canTransferOwnership = false;
      transferOwnershipTooltip = 'Cannot transfer ownership to the current project owner!';
    }
    if (
      !permsCalc
        .withDomain({
          projectId: [this.project.id ?? ''],
        })
        .hasPermission(Permission.TransferProjectOwnership)
    ) {
      canTransferOwnership = false;
      transferOwnershipTooltip = 'Insufficient permissions';
    }

    let canKickMember = true;
    let kickMemberTooltip = '';
    if (!canUpdateMember) {
      canKickMember = false;
      kickMemberTooltip = 'Insufficient permissions';
    }
    if (this.project.members.length === 1) {
      canKickMember = false;
      kickMemberTooltip = 'Project must have at least one member';
    }
    if (member.roles?.some((x) => x?.roleCode === RoleCode.ProjectOwner)) {
      canKickMember = false;
      kickMemberTooltip = 'Cannot kick the owner until ownership is transferred!';
    }

    let canManageMemberRoles = permsCalc
      .withDomain({
        projectMemberId: [member.id],
      })
      .hasPermission(Permission.ManageProjectMemberRoles);

    return {
      canUpdateMember,
      canKickMember,
      canManageMemberRoles,
      canTransferOwnership,
      kickMemberTooltip,
      updateMemberTooltip,
      transferOwnershipTooltip,
    };
  }

  async onTransferOwnership(member: PartialDeep<ProjectMember> | undefined) {
    if (!member) return;
    const confirmed = await firstValueFrom(
      this.uiMessage.confirmDialog(
        `Are you sure you want to transfer ownership of "${this.project.name}" to "${member.user?.username}"?`,
      ),
    );

    if (!confirmed) return;

    const result = await firstValueFrom(
      this.backend.withAuth().mutate({
        mutation: gql`
          mutation TransferProjectOwnership($projectId: ID!, $memberId: ID!) {
            transferProjectOwnership(projectId: $projectId, memberId: $memberId)
          }
        `,
        variables: {
          projectId: this.project.id,
          memberId: member.id,
        },
      }),
    );

    if (result.errors) return;

    this.edited.emit();
    this.uiMessage.notifyConfirmed('Ownership transferred!');
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

export type ProjectMemberOptions = {
  canUpdateMember: boolean;
  canKickMember: boolean;
  canTransferOwnership: boolean;
  canManageMemberRoles: boolean;
  kickMemberTooltip: string;
  updateMemberTooltip: string;
  transferOwnershipTooltip: string;
};
