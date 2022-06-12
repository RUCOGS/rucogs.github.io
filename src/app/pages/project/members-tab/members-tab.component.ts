import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { BackendService, CdnService, SecurityService } from '@src/app/services/_services.module';
import { deepClone } from '@src/app/utils/utils';
import { Permission, Project, ProjectMember } from '@src/generated/graphql-endpoint.types';
import { gql } from 'apollo-angular';
import { first } from 'rxjs/operators';
import { PartialDeep } from 'type-fest';
import { EditMemberDialogComponent, EditMemberDialogData } from '../edit-member-dialog/edit-member-dialog.component';
import { DefaultProjectOptions, ProjectOptions } from '../project-page/project-page.component';

@Component({
  selector: 'app-members-tab',
  templateUrl: './members-tab.component.html',
  styleUrls: ['./members-tab.component.css']
})
export class MembersTabComponent implements OnInit {

  @Output() edited = new EventEmitter();

  @Input() project: PartialDeep<Project> = {};
  @Input() projectOptions: ProjectOptions = DefaultProjectOptions;

  constructor(
    public cdn: CdnService,
    private backend: BackendService,
    private security: SecurityService,
    private uiMessage: UIMessageService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  async onEdit(member: PartialDeep<ProjectMember> | undefined) {
    const result = await this.dialog.open(EditMemberDialogComponent, {
      data: <EditMemberDialogData> {
        projectMember: member,
        projectId: this.project.id
      },
      width: "600px"
    }).afterClosed().toPromise();
    if (result)
      this.edited.emit();
  }

  async onKick(member: PartialDeep<ProjectMember> | undefined) {
    const confirmed = await this.uiMessage.confirmDialog(`Are you sure you want to kick "${member?.user?.displayName}" (@${member?.user?.username})?`)
      .pipe(first())
      .toPromise();
    if (confirmed) {
      const result = await this.backend.withAuth()
        .mutate<boolean>({
          mutation: gql`
            mutation($id: ID!) {
              deleteProjectMember(id: $id)
            }
          `,
          variables: {
            id: member?.id
          }
        }).toPromise();
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
      .hasPermission(Permission.UpdateProjectMember)
    ) {
      canUpdateMember = false;
      updateMemberTooltip = "Insufficient permissions"; 
    }

    let canKickMember = true;
    let kickMemberTooltip = "";
    if (canUpdateMember) {
      canKickMember = false;
      kickMemberTooltip = "Insufficient permissions";
    }
    if (this.project.members.length > 0) {
      canKickMember = false;
      kickMemberTooltip = "Project must have at least one member";
    }

    return {
      canUpdateMember,
      canKickMember,
      kickMemberTooltip,
      updateMemberTooltip,
    }
  }
}

type PermsData = {
  canUpdateMember: boolean
  canKickMember: boolean
  kickMemberTooltip: string
  updateMemberTooltip: string
}