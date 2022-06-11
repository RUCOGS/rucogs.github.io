import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Color, ProcessMonitor } from '@app/classes/_classes.module';
import { CdnService } from '@app/services/cdn.service';
import { ImageUploadComponent } from '@src/app/modules/image-upload/image-upload/image-upload.component';
import { ProjectMemberEdit } from '@src/app/modules/project-member/editable-project-member-profile/editable-project-member-profile.component';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { AuthService } from '@src/app/services/auth.service';
import { BackendService } from '@src/app/services/backend.service';
import { SecurityService } from '@src/app/services/security.service';
import { deepClone } from '@src/app/utils/utils';
import { Access, Permission, Project, ProjectFilterInput, ProjectMember, RoleCode } from '@src/generated/graphql-endpoint.types';
import { OperationSecurityDomain } from '@src/shared/security';
import { assertProjectValid } from '@src/shared/validation';
import { SettingsService } from '@src/_settings';
import { gql } from 'apollo-angular';
import ColorThief from 'colorthief';
import { Subject } from 'rxjs';
import { finalize, first, takeUntil } from 'rxjs/operators';
import { PartialDeep } from 'type-fest';

export const DefaultProjectOptions = {
  isMember: false, 
  nonExistent: false,
  hasEditPerms: false,
}

export type ProjectOptions = {
  isMember: boolean
  nonExistent: boolean
  hasEditPerms: boolean
}

export const CARD_IMAGE_FILE_SIZE_LIMIT_MB = 10;
export const BANNER_FILE_SIZE_LIMIT_MB = 10;

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {

  project: PartialDeep<Project> = {};
  projectOptions: ProjectOptions = DefaultProjectOptions;
  
  private opDomain: OperationSecurityDomain | undefined;
  private onDestroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute, 
    private backend: BackendService,
    private securityService: SecurityService,
    private authService: AuthService,
  ) {}
  
  ngOnInit() {
    this.activatedRoute.paramMap.pipe(takeUntil(this.onDestroy$))
      .subscribe(async (params) => {
      // TODO:      
      this.project.id = params.get('projectId') as string;

      await this.securityService.waitUntilReady();

      this.fetchData();
    });
  }
  
  ngOnDestroy() {
    this.onDestroy$.next();
  }

  fetchData() {
    this.backend.withAuth().query<{
      projects: {
        id: string,
        cardImageLink: string
        bannerLink: string
        completedAt: Date
        createdAt: Date
        updatedAt: Date
        name: string
        access: Access
        pitch: string
        description: string
        downloadLinks: string[]
        members: {
          id: string,
          contributions: string
          user: {
            id: string
            avatarLink: string
            username: string
            displayName: string
          }
          roles: {
            roleCode: RoleCode
          }[]
        }[]
      }[]
    }>({
      query: gql`
        query($filter: ProjectFilterInput) {
          projects(filter: $filter) {
            id
            cardImageLink
            bannerLink
            completedAt
            createdAt
            updatedAt
            name
            access
            pitch
            description
            downloadLinks
            members {
              id
              user {
                id
                avatarLink
                username
                displayName
              }
              contributions
              roles {
                roleCode
              }
            }
          }
        }
      `,
      variables: {
        filter: <ProjectFilterInput>{
          id: { eq: this.project.id }
        }
      },
    })
    .pipe(first())
    .subscribe(({data}) => {
      if (data.projects.length == 0) {
        this.projectOptions.nonExistent = true;
        return;
      }

      this.project = data.projects[0];
      this.opDomain = <OperationSecurityDomain>{
        projectId: [ this.project.id ]
      };

      const permCalc = this.securityService.makePermCalc().withDomain(this.opDomain);
      this.projectOptions.hasEditPerms = permCalc.hasPermission(Permission.UpdateProject);

      if (this.authService.authenticated)
        this.projectOptions.isMember = this.project.members?.some(x => x?.user?.id === this.authService.getPayload()?.user.id) ?? false;
    });
  }
}