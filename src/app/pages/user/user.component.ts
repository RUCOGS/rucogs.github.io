import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '@app/utils/project';
import { FileUtils } from '@app/utils/file-utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import ColorThief from 'colorthief';
import { Color } from '@app/utils/color';
import { UserSocial } from '@app/utils/user-social';
import { SettingsService } from '@src/_settings';
import { AuthService } from '@app/services/auth.service';
import { CdnService } from '@app/services/cdn.service';
import { OperationSecurityDomain } from '@src/shared/security.types';
import { Permission } from '@src/generated/model.types';
import { SecurityService } from '@src/app/services/security.service';
import { ApolloContext } from '@src/app/modules/graphql/graphql.module';
import { BackendService } from '@src/app/services/backend.service';

export const AVATAR_FILE_SIZE_LIMIT_MB = 5;
export const BANNER_FILE_SIZE_LIMIT_MB = 10;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  username: string = "";
  displayName: string = "";
  bio: string = "";
  userId: string = "";
  
  userSocials: UserSocial[] = [];
  projects: Project[] = [];

  hasEditPerms: boolean = false;
  isEditing: boolean = false;
  processingQueue: boolean[] = [];
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
  selectedAvatarSrc: string = "";
  selectedBannerSrc: string = "";
  selectedDisplayName: string = "";

  selectedAvatarFile: File | undefined;
  selectedBannerFile: File | undefined;

  avatarSrc: string = "https://c.tenor.com/Tu0MCmJ4TJUAAAAC/load-loading.gif";
  bannerSrc: string = "https://c.tenor.com/Tu0MCmJ4TJUAAAAC/load-loading.gif";
  bannerColor: Color | undefined;

  private activatedRouteSub: any;
  private userQuerySubscription: Subscription | undefined;
  private userMutationSubscription: Subscription | undefined;

  private opDomain: OperationSecurityDomain | undefined;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private backend: BackendService,
    private settings: SettingsService,
    private authService: AuthService,
    private securityService: SecurityService,
    private cdnService: CdnService,
  ) {
    this.form = formBuilder.group({
      displayName: [null, [Validators.required]],
      bio: [null, []]
    })
  }
  
  ngOnInit() {
    this.activatedRouteSub = this.activatedRoute.paramMap.subscribe(params => {
      this.username = params.get('username') as string;

      this.fetchData();
    });
  }

  private fetchData() {
    this.userQuerySubscription = this.backend.watchQuery<{
      users: {
        // Result type
        avatarLink: string, 
        bannerLink: string, 
        displayName: string,
        bio: string,
        id: string,
        socials: {
          username: string,
          platform: string,
          link: string,
        }[],
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
            socials {
              username
              platform
              link
            }
          }
        }
      `,
      variables: {
        filter: {
          username: { eq: this.username }
        }
      },
      context: <ApolloContext>{
        authenticate: true,
      }
    })
    .valueChanges.subscribe(({data}) => {
      const myUser = data.users[0];
      this.avatarSrc = this.cdnService.getFileLink(myUser.avatarLink);
      this.bannerSrc = this.cdnService.getFileLink(myUser.bannerLink);
      this.displayName = myUser.displayName;
      this.bio = myUser.bio;
      this.userId = myUser.id;
      
      this.opDomain = <OperationSecurityDomain>{
        userId: [ this.userId ]
      };
      this.hasEditPerms = this.securityService.isPermissionValidForOpDomain(Permission.UpdateProfile, this.opDomain);

      this.userSocials = myUser.socials.map(x => new UserSocial(x.platform, x.username, x.link));

      this.updateBannerColor();
    });
  }
  
  updateBannerColor() {
    // We only default to color when there isn't a banner.
    if (this.bannerSrc != "")
      return;
    
    const img = document.querySelector<HTMLImageElement>('img.app-user.profile-picture')
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
    this.userQuerySubscription?.unsubscribe();
  }

  canEditProfile() {
    return this.authService.getPayload()?.user.id === this.userId && this.hasEditPerms;
  }

  editProfile() {
    this.isEditing = true;

    this.selectedAvatarSrc = this.avatarSrc;
    this.selectedBannerSrc = this.bannerSrc;
    this.selectedDisplayName = this.displayName;

    this.selectedAvatarFile = undefined;
    this.selectedBannerFile = undefined;

    this.form.get('displayName')?.setValue(this.displayName);
    this.form.get('bio')?.setValue(this.bio);
  }

  // Don't save, revert changes
  exitEditProfile() {
    this.isEditing = false;
  }

  saveProfile() {
    this.isEditing = false;
    // TODO: handle sending new profile data to server
    
    // Upload profile picture
    const profileUploadFormData = new FormData();

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

    for (const entry of profileUploadFormData.entries()) {
      console.log(entry);
    }

    // If change data is not empty, meaning there were changes...
    if (profileUploadFormData.entries().next().value) {
      this.addProcess();
      this.backend
        .withAuth()
        .withOpDomain(this.opDomain)
        .post(
          "/upload/user/", 
          profileUploadFormData
        ).subscribe({
          error: (error) => {
            console.log("Hit error");
            console.log(error);
            this.removeProcess();
          },
          next: (value: any) => {
            console.log("value: " + JSON.stringify(value));
            
            if (value.data.avatarLink)
              this.avatarSrc = this.cdnService.getFileLink(value.data.avatarLink);
            if (value.data.bannerLink)
              this.bannerSrc = this.cdnService.getFileLink(value.data.bannerLink);
            if (value.data.displayName)
              this.displayName = value.data.displayName;
            if (value.data.bio)
              this.bio = value.data.bio;

            this.updateBannerColor();
          },
          complete: () => {
            console.log("uploading payload complete");
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
          if (filesize < AVATAR_FILE_SIZE_LIMIT_MB) {
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