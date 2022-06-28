import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { defaultUserOptions, UserOptions } from '@pages/users/user-page/classes';
import { Color, ProcessMonitor } from '@src/app/classes/_classes.module';
import { ProjectsDisplayComponent } from '@src/app/modules/project/project.module';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { BackendService, CdnService, SecurityService } from '@src/app/services/_services.module';
import { Access, Project, RoleCode, User } from '@src/generated/graphql-endpoint.types';
import { ProjectFilterInput } from '@src/generated/model.types';
import { SettingsService } from '@src/_settings';
import { gql } from 'apollo-angular';
import ColorThief from 'colorthief';
import { firstValueFrom } from 'rxjs';
import { PartialDeep } from 'type-fest';
import { EditUserDialogComponent, EditUserDialogData } from '../edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-overview-tab',
  templateUrl: './overview-tab.component.html',
  styleUrls: ['./overview-tab.component.css'],
})
export class OverviewTabComponent implements AfterViewChecked, OnChanges {
  @Output() edited = new EventEmitter();

  @Input() user: PartialDeep<User> = {};
  @Input() userOptions: UserOptions = defaultUserOptions();

  @ViewChild(ProjectsDisplayComponent) projectsDisplay?: ProjectsDisplayComponent;

  avatarSrc: string = 'https://c.tenor.com/Tu0MCmJ4TJUAAAAC/load-loading.gif';
  bannerSrc: string = 'https://c.tenor.com/Tu0MCmJ4TJUAAAAC/load-loading.gif';
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
      this.bannerSrc = this.user.bannerLink ? this.cdnService.getFileLink(this.user.bannerLink) : '';
      this.avatarSrc = this.user.avatarLink
        ? this.cdnService.getFileLink(this.user.avatarLink)
        : this.settings.General.defaultAvatarSrc;

      if (this.user.roles) this.roles = this.user.roles.map((x) => x?.roleCode as RoleCode);

      this.projectsDisplay?.queryUntilFillPage();
    }
  }

  getDateString(date: number) {
    return new Date(date).toLocaleString();
  }

  trySetupBannerColorListeners() {
    if (this.setupBannerColorListener) return;

    const img = document.querySelector<HTMLImageElement>('img.user-page.overview-tab.avatar');
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
      ...(this.bannerColor && { 'background-color': this.bannerColor.hexString() }),
    };
  }

  async projectsQuery(filter: any, skip: number, limit: number): Promise<Partial<Project>[]> {
    if (!this.userOptions.hasProjects || !this.user.id || !this.user.projectMembers) return [];

    const result = await firstValueFrom(
      this.backend.query<{
        projects: {
          // Result type
          id: string;
          access: Access;
          cardImageLink: string;
          completedAt: Date;
          createdAt: Date;
          updatedAt: Date;
          name: string;
          pitch: string;
          description: string;
          downloadLinks: string[];
          members: {
            user: {
              avatarLink: string;
            };
          }[];
        }[];
      }>({
        query: gql`
          query ($filter: ProjectFilterInput, $skip: Int, $limit: Int) {
            projects(filter: $filter, skip: $skip, limit: $limit) {
              id
              access
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
            id: { in: this.user.projectMembers.map((x) => x?.projectId) },
          },
        },
      }),
    );

    if (result.error) return [];

    return <Partial<Project>[]>result.data.projects;
  }

  async edit() {
    const result = await firstValueFrom(
      this.dialog
        .open(EditUserDialogComponent, {
          data: <EditUserDialogData>{
            user: this.user,
            userOptions: this.userOptions,
          },
          width: '37.5em',
          maxWidth: '90vw',
        })
        .afterClosed(),
    );

    if (result) this.edited.emit();
  }

  onNewProjectClick() {
    this.router.navigateByUrl('/projects/new');
  }

  getClassYearString(classYear: number) {
    const currYear = new Date().getFullYear();
    const grade = classYear - currYear;
    if (grade > 4) {
      return '📨 Incoming';
    } else if (grade === 1) {
      return '🎆 Senior';
    } else if (grade === 2) {
      return '🌇 Junior';
    } else if (grade === 3) {
      return '🦜 Sophmore';
    } else if (grade === 4) {
      return '🔰 Freshman';
    } else {
      return '🎓 Alumni';
    }
  }
}
