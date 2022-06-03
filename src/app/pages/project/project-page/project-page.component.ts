import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '@src/generated/graphql-endpoint.types';
import { FileUtils } from '@app/utils/file-utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import ColorThief from 'colorthief';
import { Color } from '@app/classes/_classes.module';
import { CdnService } from '@app/services/cdn.service';
import { getRolesBelowRoles, OperationSecurityDomain } from '@src/shared/security';
import { Permission, RoleCode } from '@src/generated/graphql-endpoint.types';
import { SecurityService } from '@src/app/services/security.service';
import { ApolloContext } from '@src/app/modules/graphql/graphql.module';
import { BackendService } from '@src/app/services/backend.service';

export const CARD_IMAGE_FILE_SIZE_LIMIT_MB = 10;
export const BANNER_FILE_SIZE_LIMIT_MB = 10;

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit, OnDestroy {
  projectname: string = "";
  displayName: string = "";
  bio: string = "";
  projectId: string = "";

  projects: Partial<Project>[] = [];
  roles: RoleCode[] = [];
  acceptedRoles: RoleCode[] = [];

  isEditing: boolean = false;
  processingQueue: boolean[] = [];

  hasEditPerms: boolean = false;
  hasManageProjectPerms: boolean = false;
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
  // a new image is uploaded from the project's computer.
  selectedAvatarSrc: string = "";
  selectedBannerSrc: string = "";
  selectedDisplayName: string = "";

  selectedAvatarFile: File | undefined;
  selectedBannerFile: File | undefined;
  
  rolesEdited: boolean = false;
  socialsEdited: boolean = false;
  projectSocialEdits: ProjectSocialEdit[] = [];
  selectedRoles: RoleCode[] = [];

  avatarSrc: string = "https://c.tenor.com/Tu0MCmJ4TJUAAAAC/load-loading.gif";
  bannerSrc: string = "https://c.tenor.com/Tu0MCmJ4TJUAAAAC/load-loading.gif";
  bannerColor: Color | undefined;

  private activatedRouteSub: any;
  private projectQuerySubscription: Subscription | undefined;
  private projectMutationSubscription: Subscription | undefined;

  private opDomain: OperationSecurityDomain | undefined;

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
    this.activatedRouteSub = this.activatedRoute.paramMap.subscribe(params => {
      this.projectname = params.get('projectname') as string;

      this.fetchData();
    });
  }

  private fetchData() {
    this.projectQuerySubscription = this.backend.watchQuery<{
      projects: {
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
          projectname: string,
          platform: string,
          link: string,
        }[],
      }[]
    }>({
      query: gql`
        query($filter: ProjectFilterInput) {
          projects(filter: $filter) {
            avatarLink
            bannerLink
            displayName
            bio
            id
            roles {
              roleCode
            }
            socials {
              projectname
              platform
              link
            }
          }
        }
      `,
      variables: {
        filter: {
          projectname: { eq: this.projectname }
        }
      },
      context: <ApolloContext>{
        authenticate: true,
      }
    })
    .valueChanges.subscribe(({data}) => {
      if (data.projects.length == 0) {
        this.nonExistent = true;
        return;
      }
      
      const myProject = data.projects[0];
      this.avatarSrc = this.cdnService.getFileLink(myProject.avatarLink);
      this.bannerSrc = this.cdnService.getFileLink(myProject.bannerLink);
      this.displayName = myProject.displayName;
      this.bio = myProject.bio;
      this.projectId = myProject.id;
      
      this.opDomain = <OperationSecurityDomain>{
        projectId: [ this.projectId ]
      };
      const permCalc = this.securityService.makePermCalc().withDomain(this.opDomain);
      this.hasEditPerms = permCalc.hasPermission(Permission.UpdateProfile);
      this.hasManageProjectPerms = permCalc.hasPermission(Permission.UpdateProject);

      this.roles = myProject.roles.map(x => x.roleCode as RoleCode);
      
      this.acceptedRoles = getRolesBelowRoles(this.roles);

      this.updateBannerColor();
      
      this.changeDetector.detectChanges();
    });
  }
  
  updateBannerColor() {
    // We only default to color when there isn't a banner.
    if (this.bannerSrc != "")
      return;
    
    const img = document.querySelector<HTMLImageElement>('img.app-project.profile-picture')
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

  ngOnDestroy() {
    this.activatedRouteSub.unsubscribe();
    this.projectQuerySubscription?.unsubscribe();
  }

  editProfile() {
    this.isEditing = true;

    this.selectedAvatarSrc = this.avatarSrc;
    this.selectedBannerSrc = this.bannerSrc;
    this.selectedDisplayName = this.displayName;

    this.selectedAvatarFile = undefined;
    this.selectedBannerFile = undefined;

    this.rolesEdited = false;
    this.selectedRoles = this.roles;

    this.form.get('displayName')?.setValue(this.displayName);
    this.form.get('bio')?.setValue(this.bio);
  }

  // Don't save, revert changes
  exitEditProfile() {
    this.isEditing = false;
  }

  onEditRoles() {
    this.rolesEdited = true;
  }

  onAddSocial() {
    this.projectSocialEdits.push(new ProjectSocialEdit());
  }

  onDeleteSocial(index: number) {
    this.projectSocialEdits.splice(index, 1);
  }

  validate() {
    let valid = true;
    for (const projectSocialEdit of this.projectSocialEdits) {
      if (!projectSocialEdit.validate())
        valid = false;
    }

    return valid;
  }

  saveProfile() {
    if (!this.validate())
      return;
    
    this.isEditing = false;
    // TODO: handle sending new profile data to server
    
    // Upload profile picture
    const profileUploadFormData = new FormData();

    if (this.rolesEdited) {
      console.log("roles edit");
      profileUploadFormData.set("roles", JSON.stringify(this.roles));
    }

    // Display name changed
    if (this.form.get("displayName")?.value !== this.displayName) {
      profileUploadFormData.set("displayName", this.form.get("displayName")?.value);
    }
    
    // Bio changed
    if (this.form.get("bio")?.value !== this.bio) {
      profileUploadFormData.set("bio", this.form.get("bio")?.value);
    }

    if (this.selectedAvatarFile) {
      profileUploadFormData.append("avatar", this.selectedAvatarFile);
    }

    // Upload background picture
    if (this.selectedBannerFile) {
      profileUploadFormData.append("banner", this.selectedBannerFile);
    }

    // If change data is not empty, meaning there were changes...
    if (profileUploadFormData.entries().next().value) {
      this.addProcess();
      this.backend
        .withAuth()
        .withOpDomain(this.opDomain)
        .post<{
          data: {
            avatarLink?: string,
            bannerLink?: string,
            socials?: {
              projectname: string,
              platform: string,
              link: string
            }[],
            bio?: string,
            displayName?: string,
            roleCodes?: RoleCode[],
          }
        }>(
          "/upload/project/", 
          profileUploadFormData
        ).subscribe({
          error: (error) => {
            this.removeProcess();
          },
          next: (value) => {
            if (value.data.avatarLink)
              this.avatarSrc = this.cdnService.getFileLink(value.data.avatarLink);
            if (value.data.bannerLink)
              this.bannerSrc = this.cdnService.getFileLink(value.data.bannerLink);
            if (value.data.displayName)
              this.displayName = value.data.displayName;
            if (value.data.bio)
              this.bio = value.data.bio;
            if (value.data.socials)
              this.projectSocials = value.data.socials;
            if (value.data.roleCodes)
              this.roles = value.data.roleCodes

            if (value.data.avatarLink || value.data.bannerLink)
              this.updateBannerColor();
          },
          complete: () => {
            this.removeProcess();
          }
        });
    }
  }

  onAvatarChanged(event: any) {
    const file: File = event.target.files[0];
    
    if (file) {
      this.addProcess();
      FileUtils.ReadAsBase64(file)
        .then(result => {
          // Limit file size to less than 2 MB
          const filesize = FileUtils.ByteToMB(FileUtils.Base64ToByteSize(result));
          if (filesize < CARD_IMAGE_FILE_SIZE_LIMIT_MB) {
            this.selectedAvatarFile = file;
            this.selectedAvatarSrc = result;
          } else {
            // TODO: Make popup for errors
            console.log(`File size is too big! ${filesize}MB > 2MB`);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.removeProcess();
        });
    }
  }

  onBannerChanged(event: any) {
    const file: File = event.target.files[0];
    
    if (file) {
      this.addProcess();
      FileUtils.ReadAsBase64(file)
        .then(result => {
          // Limit file size
          const filesize = FileUtils.ByteToMB(FileUtils.Base64ToByteSize(result));
          if (filesize < BANNER_FILE_SIZE_LIMIT_MB) {
            this.selectedBannerFile = file;
            this.selectedBannerSrc = result;
          } else {
            // TODO: Make popup for errors
            console.log(`File size is too big! ${filesize}MB > 2MB`);
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.removeProcess();
        });
    }
  }

  // We use the container to show a single colored banner
  getBannerContainerStyle(): Object {
    return { 
      ...(this.bannerColor && {'background-color': this.bannerColor.hexString() })
    }
  }
}