import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project, ProjectFilterInput, ProjectMember } from '@src/generated/graphql-endpoint.types';
import { FileUtils } from '@app/utils/file-utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { gql } from 'apollo-angular';
import { Subject, Subscription } from 'rxjs';
import ColorThief from 'colorthief';
import { Color } from '@app/classes/_classes.module';
import { CdnService } from '@app/services/cdn.service';
import { getRolesBelowRoles, OperationSecurityDomain } from '@src/shared/security';
import { Permission, RoleCode } from '@src/generated/graphql-endpoint.types';
import { SecurityService } from '@src/app/services/security.service';
import { ApolloContext } from '@src/app/modules/graphql/graphql.module';
import { BackendService } from '@src/app/services/backend.service';
import { PartialDeep } from 'type-fest';
import { takeUntil } from 'rxjs/operators';

export const CARD_IMAGE_FILE_SIZE_LIMIT_MB = 10;
export const BANNER_FILE_SIZE_LIMIT_MB = 10;

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit, OnDestroy {
  
  // project: Partial<Project> = {
  //   bannerLink: "https://c.tenor.com/Tu0MCmJ4TJUAAAAC/load-loading.gif",
  //   cardImageLink: "https://c.tenor.com/Tu0MCmJ4TJUAAAAC/load-loading.gif",
  // }

  project: PartialDeep<Project> = {};

  projectEdits: PartialDeep<Project> = {};

  isEditing: boolean = false;
  processingQueue: boolean[] = [];

  hasEditPerms: boolean = false;
  nonExistent: boolean = false;

  // 'processing' is set to true whenever we are processing an uplaod
  // or doing anything else asynchronously. This lets us disable uplaod controls
  // when we are still processing an image. 
  get processing(): boolean {
    return this.processingQueue.length > 0;
  }

  addProcess(): void {
    this.processingQueue.push(true);
  }

  removeProcess(): void {
    this.processingQueue.pop();
  }

  form: FormGroup;

  selectedCardImageFile: File | undefined;
  selectedBannerFile: File | undefined;
  
  projectMembersEdited: boolean = false;
  // projectMemberEdits: ProjectMemberEdit[] = [];
  
  bannerColor: Color | undefined;
  isMarkdownReady = false;

  private opDomain: OperationSecurityDomain | undefined;
  private onDestroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute, 
    formBuilder: FormBuilder, 
    private backend: BackendService,
    private securityService: SecurityService,
    private cdnService: CdnService,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.form = formBuilder.group({
      displayName: [null, [Validators.required]],
      bio: [null, []]
    })
  }
  
  ngOnInit() {
    this.activatedRoute.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(params => {
      // TODO:      
      this.project.id = params.get('projectId') as string;

      this.fetchData();
    });
  }
  
  ngOnDestroy() {
    this.onDestroy$.next();
  }

  private fetchData() {
    this.isMarkdownReady = false;
    this.backend.watchQuery<{
      projects: {
        id: string,
        cardImageLink: string
        bannerLink: string
        completedAt: Date
        createdAt: Date
        updatedAt: Date
        name: string
        pitch: string
        description: string
        downloadLinks: string[]
        members: {
          contributions: string
          user: {
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
            pitch
            description
            downloadLinks
            members {
              user {
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
      context: <ApolloContext>{
        authenticate: true,
      }
    })
    .valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(({data}) => {
      if (data.projects.length == 0) {
        this.nonExistent = true;
        return;
      }
      
      this.project = data.projects[0];
      this.opDomain = <OperationSecurityDomain>{
        projectId: [ this.project.id ]
      };
      const permCalc = this.securityService.makePermCalc().withDomain(this.opDomain);
      this.hasEditPerms = permCalc.hasPermission(Permission.UpdateProject);
      
      this.isMarkdownReady = true;

      this.changeDetector.detectChanges();
    });
  }
  
  getProjectMembers() {
    return this.project.members as PartialDeep<ProjectMember>[];
  }

  getFileLink(filePath: string) {
    return this.cdnService.getFileLink(filePath);
  }

  // We use the container to show a single colored banner
  getBannerContainerStyle(): Object {
    return { 
      ...(this.bannerColor && {'background-color': this.bannerColor.hexString() })
    }
  }

  edit() {

  }
}