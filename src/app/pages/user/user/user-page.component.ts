import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Color, ProcessMonitor } from '@app/classes/_classes.module';
import { CdnService } from '@app/services/cdn.service';
import { ImageUploadComponent } from '@src/app/modules/image-upload/image-upload.module';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { UserSocialEdit } from '@src/app/modules/user/editable-social-button/editable-social-button.component';
import { BackendService } from '@src/app/services/backend.service';
import { SecurityService } from '@src/app/services/security.service';
import { AuthService, RolesService } from '@src/app/services/_services.module';
import { Permission, Project, ProjectFilterInput, RoleCode, UpdateUserInput, UploadOperation, UserFilterInput, UserSocial } from '@src/generated/graphql-endpoint.types';
import { OperationSecurityDomain, RoleType } from '@src/shared/security';
import { assertNoDuplicates } from '@src/shared/validation';
import { SettingsService } from '@src/_settings';
import { gql } from 'apollo-angular';
import ColorThief from 'colorthief';
import { Subject } from 'rxjs';
import { finalize, first, takeUntil } from 'rxjs/operators';

export const AVATAR_FILE_SIZE_LIMIT_MB = 5;
export const BANNER_FILE_SIZE_LIMIT_MB = 10;

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit, OnDestroy {
  username: string = "";
  displayName: string = "";
  bio: string = "";
  userId: string = "";
  
  userSocials: Partial<UserSocial>[] = [];
  roles: RoleCode[] = [];
  acceptedRoles: RoleCode[] = [];

  hasProjects: boolean = false;
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

  // The selected picture sources will become data URLs when
  // a new image is uploaded from the user's computer.
  selectedDisplayName: string = "";

  @ViewChild('avatarUpload') avatarUpload?: ImageUploadComponent;
  @ViewChild('bannerUpload') bannerUpload?: ImageUploadComponent;
  
  rolesEdited: boolean = false;
  socialsEdited: boolean = false;
  userSocialEdits: UserSocialEdit[] = [];
  selectedRoles: RoleCode[] = [];

  avatarSrc: string = "https://c.tenor.com/Tu0MCmJ4TJUAAAAC/load-loading.gif";
  bannerSrc: string = "https://c.tenor.com/Tu0MCmJ4TJUAAAAC/load-loading.gif";
  bannerColor: Color | undefined;

  monitor = new ProcessMonitor();

  private opDomain: OperationSecurityDomain | undefined;
  private onDestroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute, 
    formBuilder: FormBuilder, 
    private backend: BackendService,
    private securityService: SecurityService,
    private uiMessageService: UIMessageService,
    private cdnService: CdnService,
    private changeDetector: ChangeDetectorRef,
    private rolesService: RolesService,
    private settings: SettingsService,
    private router: Router,
    private authService: AuthService,
  ) {
    this.form = formBuilder.group({
      displayName: [null, [Validators.required]],
      bio: [null, []]
    })
  }
  
  ngOnInit() {
    this.activatedRoute.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(params => {
      this.username = params.get('username') as string;

      this.fetchData();
    });
  }
  
  ngOnDestroy() {
    this.onDestroy$.next();
  }

  private fetchData() {
    this.backend.withAuth().query<{
      users: {
        // Result type
        avatarLink: string, 
        bannerLink: string, 
        displayName: string,
        bio: string,
        id: string,
        roles: {
          roleCode: string
        }[],
        socials: {
          username: string,
          platform: string,
          link: string,
        }[],
        projectMembers: {
          id: string
        }[]
      }[]
    }>({
      query: gql`
        query($filter: UserFilterInput) {
          users(filter: $filter) {
            avatarLink
            bannerLink
            displayName
            bio
            id
            roles {
              roleCode
            }
            socials {
              username
              platform
              link
            }
            projectMembers {
              id
            }
          }
        }
      `,
      variables: {
        filter: {
          username: { eq: this.username }
        }
      },
      fetchPolicy: 'no-cache'
    })
    .pipe(first())
    .subscribe(async({data}) => {
      if (data.users.length == 0) {
        this.nonExistent = true;
        return;
      }
      
      const myUser = data.users[0];
      this.avatarSrc = this.cdnService.getFileLink(myUser.avatarLink)
      if (this.avatarSrc === "")
        this.avatarSrc = this.settings.General.defaultAvatarSrc;
      this.bannerSrc = this.cdnService.getFileLink(myUser.bannerLink);
      this.displayName = myUser.displayName;
      this.bio = myUser.bio;
      this.userId = myUser.id;
      
      this.opDomain = <OperationSecurityDomain>{
        userId: [ this.userId ]
      };
      const permCalc = this.securityService.makePermCalc().withDomain(this.opDomain);
      this.hasEditPerms = permCalc.hasPermission(Permission.UpdateUser);

      this.userSocials = myUser.socials;
      this.roles = myUser.roles.map(x => x.roleCode as RoleCode);
      this.acceptedRoles = await this.rolesService.getAddableUserRoles();
      
      this.updateBannerColor();

      this.hasProjects = myUser.projectMembers.length > 0;

      this.changeDetector.detectChanges();
    });
  }
  
  updateBannerColor() {
    // We only default to color when there isn't a banner.
    if (this.bannerSrc !== "")
      return;
    
    const img = document.querySelector<HTMLImageElement>('img.app-user-page.avatar')
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
        });
      }
    }
  }

  async projectsQuery(filter: any, skip: number, limit: number): Promise<Partial<Project>[]> {
    if (!this.hasProjects)
      return [];

    // TODO LATER: Once Typetta gets support for filtering
    //             based on value in foreign keys.
    const userOwnedProjectsResult = await this.backend.query<{
      users: {
        projectMembers: {
          project: {
            id: string
          }
        }[]
      }[]
    }>({
      query: gql`
        query($filter: UserFilterInput) {
          users(filter: $filter) {
            projectMembers {
              project {
                id
              }
            }
          }
        }
      `,
      variables: {
        filter: <UserFilterInput>{
          id: { eq: this.userId }
        }
      }
    }).toPromise();

    if (userOwnedProjectsResult.error || !userOwnedProjectsResult)
      return [];

    const result = await this.backend.query<{
      projects: {
        // Result type
        id: string,
        cardImageLink: string,
        completedAt: Date,
        createdAt: Date,
        updatedAt: Date,
        name: string,
        pitch: string,
        description: string,
        downloadLinks: string[],
        members: {
          user: {
            avatarLink: string
          }
        }[]
      }[]
    }>({
      query: gql`
        query($filter: ProjectFilterInput, $skip: Int, $limit: Int) {
          projects(filter: $filter, skip: $skip, limit: $limit) {
            id
            cardImageLink
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
              }
            }
          }
        }
      `,
    variables: {
      skip,
      limit,
      filter: <ProjectFilterInput>{
        ...filter,
        id: { in: userOwnedProjectsResult.data.users[0].projectMembers.map(x => x.project.id) },
      }
    }
    }).toPromise();
    
    if (result.error)
      return [];
    return <Partial<Project>[]>result.data.projects;
  }

  onEditSocial() {
    this.socialsEdited = true;
  }

  onEditRoles() {
    this.rolesEdited = true;
  }

  onAddSocial() {
    this.userSocialEdits.push(new UserSocialEdit());
  }

  onDeleteSocial(index: number) {
    this.userSocialEdits.splice(index, 1);
  }

  // We use the container to show a single colored banner
  getBannerContainerStyle(): Object {
    return { 
      ...(this.bannerColor && {'background-color': this.bannerColor.hexString() })
    }
  }

  onNewProjectClick() {
    this.router.navigateByUrl('/projects/new');
  }

  //#region // ----- FORM BASE ----- //

  edit() {
    this.isEditing = true;

    this.changeDetector.detectChanges();
    if (!this.avatarUpload || !this.bannerUpload)
      return;
    
    this.avatarUpload.init(this.avatarSrc == this.settings.General.defaultAvatarSrc ? "" : this.avatarSrc);
    this.bannerUpload.init(this.bannerSrc);
    
    this.selectedDisplayName = this.displayName;

    this.socialsEdited = false;
    this.userSocialEdits = this.userSocials.map(x => new UserSocialEdit({
      link: x.link ?? "",
      platform: x.platform ?? "",
      username: x.username ?? ""
    }));

    this.rolesEdited = false;
    this.selectedRoles = this.roles;

    this.form.get('displayName')?.setValue(this.displayName);
    this.form.get('bio')?.setValue(this.bio);
  }

  // Don't save, revert changes
  exitEdit() {
    this.isEditing = false;
  }

  validate() {
    try {
      for (const userSocialEdit of this.userSocialEdits) {
        if (!userSocialEdit.validate())
          throw new Error("A user social is incomplete!");
      }
      
      assertNoDuplicates(
        this.userSocialEdits.map(x => x.userSocial), 
        (a, b) => {
          return a.username === b.username && a.platform === b.platform
        },
        "Cannot have duplicate user socials with identical usernames and platforms!"
      );

      return true;
    } catch(err: any) {
      this.uiMessageService.error(err);
      return false;
    }
  }

  save() {
    if (!this.avatarUpload || !this.bannerUpload || 
        !this.validate()) {
      return;
    }
    
    this.isEditing = false;
    
    const input = <UpdateUserInput>{
      id: this.userId
    }

    if (this.rolesEdited) {
      input.roles = this.roles;
    }

    if (this.socialsEdited) {
      input.socials = this.userSocialEdits.map(x => x.userSocial);
    }

    if (this.form.get("displayName")?.value !== this.displayName) {
      input.displayName = this.form.get("displayName")?.value;
    }
    
    if (this.form.get("bio")?.value !== this.bio) {
      input.bio = this.form.get("bio")?.value;
    }

    if (this.avatarUpload.edited) {
      input.avatar = this.avatarUpload.value ? {
        upload: this.avatarUpload.value,
        operation: UploadOperation.Insert,
      } : {
        operation: UploadOperation.Delete,
      };
    }

    if (this.bannerUpload.edited) {
      input.banner = this.bannerUpload.value ? {
        upload: this.bannerUpload.value,
        operation: UploadOperation.Insert,
      } : {
        operation: UploadOperation.Delete,
      };
    }

    // If change data is not empty, meaning there were changes...
    if (Object.keys(input).length > 1) {
      this.monitor.addProcess();
      this.backend
        .withAuth()
        .mutate<{
          updateUser: boolean
        }>({
          mutation: gql`
            mutation($input: UpdateUserInput!) {
              updateUser(input: $input)
            }
          `,
          variables: {
            input,
          }
        })
        .pipe(
          first(), 
          finalize(() => this.monitor.removeProcess())
        )
        .subscribe({
          next: (value) => {
            this.fetchData();

            if (this.userId === this.authService.getPayload()?.user.id) {
              // Regenerate payload
              this.authService.updateUser();
            }
          }
        });
    }
  }
//#endregion // -- FORM BASE ----- //
}