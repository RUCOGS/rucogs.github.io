import { AfterViewChecked, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Color, ProcessMonitor } from '@src/app/classes/_classes.module';
import { ProjectsDisplayComponent } from '@src/app/modules/project/project.module';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { BackendService, CdnService, SecurityService } from '@src/app/services/_services.module';
import { Project, RoleCode, User } from '@src/generated/graphql-endpoint.types';
import { ProjectFilterInput, UserFilterInput } from '@src/generated/model.types';
import { SettingsService } from '@src/_settings';
import { gql } from 'apollo-angular';
import ColorThief from 'colorthief';
import { first } from 'rxjs/operators';
import { PartialDeep } from 'type-fest';
import { EditUserDialogComponent, EditUserDialogData } from '../edit-user-dialog/edit-user-dialog.component';
import { DefaultUserOptions, UserOptions } from '../user-page/user-page.component';

@Component({
  selector: 'app-overview-tab',
  templateUrl: './overview-tab.component.html',
  styleUrls: ['./overview-tab.component.css']
})
export class OverviewTabComponent implements AfterViewChecked, OnChanges {

  @Output() edited = new EventEmitter();

  @Input() user: PartialDeep<User> = {};
  @Input() userOptions: UserOptions = DefaultUserOptions;

  @ViewChild(ProjectsDisplayComponent) projectsDisplay?: ProjectsDisplayComponent;
  
  avatarSrc: string = "https://c.tenor.com/Tu0MCmJ4TJUAAAAC/load-loading.gif";
  bannerSrc: string = "https://c.tenor.com/Tu0MCmJ4TJUAAAAC/load-loading.gif";
  bannerColor: Color | undefined;

  projects: PartialDeep<Project>[] = [];
  roles: RoleCode[] = [];

  monitor = new ProcessMonitor();

  private setupBannerColorListener = false;

  constructor(
    private cdnService: CdnService,
    private settings: SettingsService,
    private dialog: MatDialog,
    private backend: BackendService,
    private security: SecurityService,
    private router: Router,
    private uiMessageService: UIMessageService,
  ) {}

  // We can't use ngAfterViewInit because tab group triggers that despite not rendering the tab
  ngAfterViewChecked(): void {
    this.trySetupBannerColorListeners();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      this.bannerSrc = this.user.bannerLink ? this.cdnService.getFileLink(this.user.bannerLink) : "";
      this.avatarSrc = this.user.avatarLink ? this.cdnService.getFileLink(this.user.avatarLink) : this.settings.General.defaultAvatarSrc;

      if (this.user.roles)
        this.roles = this.user.roles.map(x => x?.roleCode as RoleCode);

      this.projectsDisplay?.queryUntilFillPage();

      console.log(this.userOptions.hasEditPerms);
    }
  }
  
  trySetupBannerColorListeners() {
    if (this.setupBannerColorListener)
      return;
    
    const img = document.querySelector<HTMLImageElement>('img.app-overview-tab.card-image')
    if (img) {
      img.setAttribute('crossOrigin', '');
      const colorThief = new ColorThief();
      img.addEventListener('load', () => {
        const [r, g, b] = colorThief.getColor(img);
        this.bannerColor = new Color(r, g, b);
      });
      this.setupBannerColorListener = true;
    }
  }

  getBannerContainerStyle() {
    return { 
      ...(this.bannerColor && {'background-color': this.bannerColor.hexString() })
    }
  }


  async projectsQuery(filter: any, skip: number, limit: number): Promise<Partial<Project>[]> {
    if (!this.userOptions.hasProjects)
      return [];

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
          id: { eq: this.user.id }
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

  async edit() {
    const result = await this.dialog.open(EditUserDialogComponent, {
      data: <EditUserDialogData>{
        user: this.user
      }
    }).afterClosed().toPromise();
    
    if (result)
      this.edited.emit();
  }

  onNewProjectClick() {
    this.router.navigateByUrl('/projects/new');
  }
}