import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project, ProjectFilterInput, ProjectMember } from '@src/generated/graphql-endpoint.types';
import { FileUtils } from '@app/utils/file-utils';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { gql } from 'apollo-angular';
import { Subject, Subscription } from 'rxjs';
import { Color } from '@app/classes/_classes.module';
import { CdnService } from '@app/services/cdn.service';
import { getRolesBelowRoles, OperationSecurityDomain } from '@src/shared/security';
import { Permission, RoleCode } from '@src/generated/graphql-endpoint.types';
import { SecurityService } from '@src/app/services/security.service';
import { ApolloContext } from '@src/app/modules/graphql/graphql.module';
import { BackendService } from '@src/app/services/backend.service';
import { PartialDeep } from 'type-fest';
import { takeUntil } from 'rxjs/operators';
import { ProjectMemberEdit } from '@src/app/modules/project-member/editable-project-member-profile/editable-project-member-profile.component';
import { assertProjectValid } from '@src/shared/utils';
import { deepClone } from '@src/app/utils/utils';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { ImageUploadComponent } from '@src/app/modules/image-upload/image-upload/image-upload.component';
import ColorThief from 'colorthief';
import { SettingsService } from '@src/_settings';


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

  isEditing: boolean = true;
  processingQueue: boolean[] = [];

  hasEditPerms: boolean = false;
  nonExistent: boolean = false;

  projectMemberEdits: ProjectMemberEdit[] = [];

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

  @ViewChild('cardImageUpload') cardImageUpload?: ImageUploadComponent;
  @ViewChild('bannerUpload') bannerUpload?: ImageUploadComponent;
  
  projectMembersEdited: boolean = false;
  // projectMemberEdits: ProjectMemberEdit[] = [];
  
  isMarkdownReady = false;
  bannerColor: Color | undefined;

  private opDomain: OperationSecurityDomain | undefined;
  private onDestroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute, 
    formBuilder: FormBuilder, 
    private backend: BackendService,
    private securityService: SecurityService,
    private cdnService: CdnService,
    private uiMessageService: UIMessageService,
    private changeDetector: ChangeDetectorRef,
    private settings: SettingsService,
  ) {
    this.form = formBuilder.group({
      name: [null, [Validators.required]],
      pitch: [null, [Validators.required]],
      description: [null, [Validators.required]],
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
            pitch
            description
            downloadLinks
            members {
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

      this.updateBannerColor();

      this.changeDetector.detectChanges();
      
      this.edit();
    });
  }
  
  getProjectMembers() {
    return this.project.members as PartialDeep<ProjectMember>[];
  }

  updateBannerColor() {
    // We only default to color when there isn't a banner.
    if (this.project.bannerLink !== "")
      return;
    
    const img = document.querySelector<HTMLImageElement>('img.app-project-page.card-image')
    if (img) {
      img.setAttribute('crossOrigin', '');
      const colorThief = new ColorThief();
      if (img.complete) {
        // colorThief.getColor(img);
        const [r, g, b] = colorThief.getColor(img);
        this.bannerColor = new Color(r, g, b);
      } else {
        img.addEventListener('load', () => {
          // colorThief.getColor(img);
          const [r, g, b] = colorThief.getColor(img);
          this.bannerColor = new Color(r, g, b);
          console.log(img.eventListeners?.length);
        });
      }
    }
  }

  getBannerContainerStyle() {
    return { 
      ...(this.bannerColor && {'background-color': this.bannerColor.hexString() })
    }
  }

  getBannerSrc() {
    return this.cdnService.getFileLink(this.project.bannerLink);
  }

  getCardImageSrc() {
    if (this.project.cardImageLink)
      return this.cdnService.getFileLink(this.project.cardImageLink);
    return this.settings.General.defaultCardImageSrc;
  }

//#region // ----- FORM BASE ----- //

  // TODO: Add perms validation
  edit() {
    this.isEditing = true;

    this.changeDetector.detectChanges();
    if (!this.cardImageUpload || !this.bannerUpload)
      return;

    const configureFormControl = (name: string, initialValue: any, enable: boolean) => {
      const control = this.form.get(name);
      if (!control)
        return;
      if (enable)
        control.enable();
      else
        control.disable();
      control.setValue(initialValue);
    }

    this.projectEdits = deepClone(this.project);

    configureFormControl('name', this.projectEdits.name, this.hasEditPerms);
    configureFormControl('pitch', this.projectEdits.pitch, this.hasEditPerms);
    configureFormControl('description', this.projectEdits.description, this.hasEditPerms);

    this.cardImageUpload.init(this.projectEdits.cardImageLink ?? "");
    this.bannerUpload.init(this.projectEdits.bannerLink ?? "");
    
    this.projectMemberEdits = this.project.members?.map(x => new ProjectMemberEdit(x)) ?? [];

    this.changeDetector.detectChanges();
  }

  exitEdit() {
    this.isEditing = false;
  }

  validate() {
    try {
      if (!this.projectMemberEdits.every(x => x.validate()))
        throw new Error("Some project members are missing information!");

      const compositeProject = deepClone(this.projectEdits);
      compositeProject.members = this.projectMemberEdits.map(x => x.compositeValue());

      assertProjectValid(compositeProject);
      
      return true;
    } catch(err: any) {
      this.uiMessageService.error(err);
      return false;
    }
  }

  save() {
    if (!this.cardImageUpload || !this.bannerUpload ||
        !this.validate())
      return;
    
    this.isEditing = false;

    // Upload profile picture
    const uploadFormData = new FormData();

    if (this.projectMembersEdited) {
      uploadFormData.set("projectMembers", JSON.stringify(this.projectMemberEdits.map(x => {
        x.projectMember
        x.roles
      })));
    }

    if (this.form.get("name")?.value !== this.project.name) {
      uploadFormData.set("name", this.form.get("name")?.value);
    }
    
    if (this.form.get("pitch")?.value !== this.project.pitch) {
      uploadFormData.set("pitch", this.form.get("pitch")?.value);
    }

    const deletedFiles: string[] = [];

    if (this.cardImageUpload.edited) {
      if (this.cardImageUpload.value)
        uploadFormData.append("cardImage", this.cardImageUpload.value);
      else
        deletedFiles.push("cardImage");
    }

    if (this.bannerUpload.edited) {
      if (this.bannerUpload.value)
        uploadFormData.append("banner", this.bannerUpload.value);
      else
        deletedFiles.push("banner");
    }

    if (deletedFiles.length > 0) {
      uploadFormData.set("deletedFiles", JSON.stringify(deletedFiles));
    }

    if (uploadFormData.entries().next().value) {
      this.addProcess();
      this.backend
        .withAuth()
        .withOpDomain(this.opDomain)
        .post<{
          data: {
            project: PartialDeep<Project>
          }
        }>(
          "/upload/project/", 
          uploadFormData
        ).pipe(takeUntil(this.onDestroy$)).subscribe({
          error: (error) => {
            this.removeProcess();
          },
          next: (value) => {
            // Spread the return value to overwrite the old data 
            // with any new changes
            this.project = { ...this.project, ...value.data.project }
            this.updateBannerColor();
          },
          complete: () => {
            this.removeProcess();
          }
        });
    }
  }
  
//#endregion // -- FORM BASE ----- //
}