import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Color, ProcessMonitor } from '@app/classes/_classes.module';
import { CdnService } from '@app/services/cdn.service';
import { ApolloContext } from '@src/app/modules/graphql/graphql.module';
import { ImageUploadComponent } from '@src/app/modules/image-upload/image-upload/image-upload.component';
import { ProjectMemberEdit } from '@src/app/modules/project-member/editable-project-member-profile/editable-project-member-profile.component';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { AuthService } from '@src/app/services/auth.service';
import { BackendService } from '@src/app/services/backend.service';
import { SecurityService } from '@src/app/services/security.service';
import { deepClone } from '@src/app/utils/utils';
import { Access, Permission, Project, ProjectFilterInput, ProjectMember, RoleCode } from '@src/generated/graphql-endpoint.types';
import { OperationSecurityDomain } from '@src/shared/security';
import { assertProjectValid } from '@src/shared/utils';
import { SettingsService } from '@src/_settings';
import { gql } from 'apollo-angular';
import ColorThief from 'colorthief';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { PartialDeep } from 'type-fest';


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
  cardImageSrc: string = "https://c.tenor.com/Tu0MCmJ4TJUAAAAC/load-loading.gif";
  bannerSrc: string = "https://c.tenor.com/Tu0MCmJ4TJUAAAAC/load-loading.gif";

  projectEdits: PartialDeep<Project> = {};

  isEditing: boolean = false;
  processingQueue: boolean[] = [];

  hasEditPerms: boolean = false;
  isMember: boolean = false;
  nonExistent: boolean = false;

  projectMemberEdits: ProjectMemberEdit[] = [];
  form: FormGroup;

  @ViewChild('cardImageUpload') cardImageUpload?: ImageUploadComponent;
  @ViewChild('bannerUpload') bannerUpload?: ImageUploadComponent;
  
  projectMembersEdited: boolean = false;
  // projectMemberEdits: ProjectMemberEdit[] = [];
  
  bannerColor: Color | undefined;
  monitor = new ProcessMonitor();

  accessOptions: {
    [key in Access]: {
      name: string
      matIcon: string
    }
  } = {
    [Access.Open]: {
      name: "Open",
      matIcon: "lock_open"
    },
    [Access.Invite]: {
      name: "Invite",
      matIcon: "mail"
    },
    [Access.Closed]: {
      name: "Closed",
      matIcon: "close"
    }
  }

  private opDomain: OperationSecurityDomain | undefined;
  private onDestroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute, 
    formBuilder: FormBuilder, 
    private backend: BackendService,
    private securityService: SecurityService,
    private authService: AuthService,
    private cdnService: CdnService,
    private uiMessageService: UIMessageService,
    private changeDetector: ChangeDetectorRef,
    private settings: SettingsService,
  ) {
    this.form = formBuilder.group({
      name: [null, [Validators.required]],
      access: [null, [Validators.required]],
      pitch: [null, [Validators.required]],
      description: [null, []],
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
    this.backend.watchQuery<{
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
      context: <ApolloContext>{
        authenticate: true,
      }
    })
    .valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(({data}) => {
      if (data.projects.length == 0) {
        this.nonExistent = true;
        return;
      }

      this.loadProject(data.projects[0]);
      this.opDomain = <OperationSecurityDomain>{
        projectId: [ this.project.id ]
      };

      const permCalc = this.securityService.makePermCalc().withDomain(this.opDomain);
      this.hasEditPerms = permCalc.hasPermission(Permission.UpdateProject);

      if (this.authService.authenticated)
        this.isMember = this.project.members?.some(x => x?.user?.id === this.authService.getPayload()?.user.id) ?? false;
      console.log(this.isMember + " " + this.project.access);

      this.changeDetector.detectChanges();
    });
  }
  
  getProjectMembers() {
    return this.project.members as PartialDeep<ProjectMember>[];
  }

  updateBannerColor() {
    // We only default to color when there isn't a banner.
    if (this.bannerSrc !== "")
      return;
    
    const img = document.querySelector<HTMLImageElement>('img.app-project-page.card-image')
    if (img) {
      img.setAttribute('crossOrigin', '');
      const colorThief = new ColorThief();
      if (img.complete) {
        const [r, g, b] = colorThief.getColor(img);
        this.bannerColor = new Color(r, g, b);
      } else {
        img.addEventListener('load', () => {
          const [r, g, b] = colorThief.getColor(img);
          this.bannerColor = new Color(r, g, b);
        });
      }
    }
  }

  getBannerContainerStyle() {
    return { 
      ...(this.bannerColor && {'background-color': this.bannerColor.hexString() })
    }
  }

  onProjectMemberEdit() {
    this.projectMembersEdited = true;
  }

  onDeleteProjectMember(index: number) {
    this.projectMemberEdits = this.projectMemberEdits.splice(index, 1);
  }

  join() {
    
  }
  
  requestInvite() {

  }

//#region // ----- FORM BASE ----- //

  // TODO: Add perms validation
  async edit() {
    this.isEditing = true;

    this.changeDetector.detectChanges();
    if (!this.cardImageUpload || !this.bannerUpload || !this.project.id)
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

    configureFormControl('access', this.projectEdits.access, this.hasEditPerms);
    configureFormControl('name', this.projectEdits.name, this.hasEditPerms);
    configureFormControl('pitch', this.projectEdits.pitch, this.hasEditPerms);
    configureFormControl('description', this.projectEdits.description, this.hasEditPerms);

    const permsCalc = this.securityService.makePermCalc();

    const addableRoles = await this.securityService.getAddableProjectRoles(this.project.id);
    
    this.cardImageUpload.init(this.cdnService.getFileLink(this.project.cardImageLink) ?? "");
    this.bannerUpload.init(this.bannerSrc ?? "");
    
    this.projectMemberEdits = this.project.members?.map((x) => {
      const canEditMember = permsCalc.withDomain({
        projectMemberId: [ x?.id ?? "" ]
      }).hasPermission(Permission.UpdateProjectMember);
      return new ProjectMemberEdit(
        x, 
        addableRoles,
        !canEditMember,
        this.project.members?.length === 1
      );
    }) ?? [];

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

      this.form.updateValueAndValidity();
      if (!this.form.valid) {
        throw new Error("Some project information is missing!");
      }

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
      uploadFormData.set("projectMembers", JSON.stringify(this.projectMemberEdits.map((x) => {
        return {
          userId: x.projectMember.user?.id,
          contributions: x.projectMember.contributions,
          roles: x.roles
        };
      })));
    }

    if (this.form.get("access")?.value !== this.project.access) {
      uploadFormData.set("access", this.form.get("access")?.value);
    }

    if (this.form.get("name")?.value !== this.project.name) {
      uploadFormData.set("name", this.form.get("name")?.value);
    }
    
    if (this.form.get("pitch")?.value !== this.project.pitch) {
      uploadFormData.set("pitch", this.form.get("pitch")?.value);
    }

    if (this.form.get("description")?.value !== this.project.description) {
      uploadFormData.set("description", this.form.get("description")?.value);
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
      this.monitor.addProcess();
      this.backend
        .withAuth()
        .withOpDomain(this.opDomain)
        .post<{
          data: {
            project: PartialDeep<Project>
            members?: {
              userId: string,
              contributions: string,
              roles: RoleCode[]
            }[]
          }
        }>(
          "/upload/project", 
          uploadFormData
        )
        .pipe(
          takeUntil(this.onDestroy$),
          finalize(() => {
            this.monitor.removeProcess();
          })
        )
        .subscribe({
          next: (value) => {
            this.loadProject(value.data.project);
            this.monitor.removeProcess();
          },
        });
    }
  }

  loadProject(project: PartialDeep<Project>) {
    // Spread the return value to overwrite the old data 
    // with any new changes
    this.project = { ...this.project, ...project };
    this.bannerSrc = this.project.bannerLink ? this.cdnService.getFileLink(this.project.bannerLink) : "";
    this.cardImageSrc = this.project.cardImageLink ? this.cdnService.getFileLink(this.project.cardImageLink) : this.settings.General.defaultCardImageSrc;

    this.updateBannerColor();

    this.changeDetector.detectChanges();
  }
  
//#endregion // -- FORM BASE ----- //
}