import { AfterViewChecked, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccessOptions } from '@app/modules/project/project.module';
import { defaultProjectOptions, ProjectOptions } from '@pages/projects/project-page/classes';
import { Color, ProcessMonitor } from '@src/app/classes/_classes.module';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import {
  BackendService,
  BreakpointManagerService,
  CdnService,
  SecurityService,
} from '@src/app/services/_services.module';
import { Breakpoint } from '@src/app/settings/breakpoints';
import { InviteType, NewProjectInviteInput, Project, ProjectMember } from '@src/generated/graphql-endpoint.types';
import { SettingsService } from '@src/_settings';
import { gql } from 'apollo-angular';
import ColorThief from 'colorthief';
import { firstValueFrom } from 'rxjs';
import { PartialDeep } from 'type-fest';
import {
  EditProjectDialogComponent,
  EditProjectDialogData,
} from '../edit-project-dialog/edit-project-dialog.component';

@Component({
  selector: 'app-overview-tab',
  templateUrl: './overview-tab.component.html',
  styleUrls: ['./overview-tab.component.css'],
})
export class OverviewTabComponent implements AfterViewChecked, OnChanges {
  @Output() edited = new EventEmitter();

  @Input() project: PartialDeep<Project> = {};
  @Input() projectOptions: ProjectOptions = defaultProjectOptions();

  cardImageSrc: string = 'https://c.tenor.com/Tu0MCmJ4TJUAAAAC/load-loading.gif';
  bannerSrc: string = 'https://c.tenor.com/Tu0MCmJ4TJUAAAAC/load-loading.gif';
  bannerColor: Color | undefined;
  accessOptions = AccessOptions;
  soundCloudColor = 'b3002d';

  monitor = new ProcessMonitor();

  private setupBannerColorListener = false;

  constructor(
    public cdn: CdnService,
    private settings: SettingsService,
    private dialog: MatDialog,
    private backend: BackendService,
    private security: SecurityService,
    private uiMessageService: UIMessageService,
    public breakpointManager: BreakpointManagerService,
  ) {}

  // We can't use ngAfterViewInit because tab group triggers that despite not rendering the tab
  ngAfterViewChecked(): void {
    this.trySetupBannerColorListeners();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project']) {
      this.bannerSrc = this.project.bannerLink ? this.cdn.getFileLink(this.project.bannerLink) : '';
      this.cardImageSrc = this.project.cardImageLink
        ? this.cdn.getFileLink(this.project.cardImageLink)
        : this.settings.General.defaultCardImageSrc;
    }
  }

  getProjectMembers() {
    return this.project.members as PartialDeep<ProjectMember>[];
  }

  trySetupBannerColorListeners() {
    if (this.setupBannerColorListener) return;

    const img = document.querySelector<HTMLImageElement>('img.project-page.overview-tab.card-image');
    if (img) {
      img.setAttribute('crossOrigin', 'Anonymous');
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

  async join() {
    if (this.monitor.isProcessing) return;

    this.monitor.addProcess();
    const result = await firstValueFrom(
      this.backend.withAuth().mutate<{
        newProjectInvite: boolean;
      }>({
        mutation: gql`
          mutation JoinOpenProject($projectId: ID!) {
            joinOpenProject(projectId: $projectId)
          }
        `,
        variables: {
          projectId: this.project.id,
        },
      }),
    );
    this.monitor.removeProcess();

    if (result.errors) return;

    // Edited notification is handled by a GraphQL subscription already
    this.uiMessageService.notifyConfirmed('Joined project!');
  }

  async requestInvite() {
    if (this.monitor.isProcessing) return;

    this.monitor.addProcess();

    const result = await firstValueFrom(
      this.backend.withAuth().mutate<{
        newProjectInvite: string;
      }>({
        mutation: gql`
          mutation NewProjectInvite($input: NewProjectInviteInput!) {
            newProjectInvite(input: $input)
          }
        `,
        variables: {
          input: <NewProjectInviteInput>{
            type: InviteType.Incoming,
            projectId: this.project.id,
            userId: this.security.securityContext?.userId,
          },
        },
      }),
    );
    this.monitor.removeProcess();

    if (result.errors) return;

    this.edited.emit();
    this.uiMessageService.notifyConfirmed('Invite sent!');
  }

  async edit() {
    const value = await firstValueFrom(
      this.dialog
        .open(EditProjectDialogComponent, {
          data: <EditProjectDialogData>{
            project: this.project,
            projectOptions: this.projectOptions,
          },
          width: '37.5em',
          maxWidth: '90vw',
        })
        .afterClosed(),
    );

    if (value) this.edited.emit();
  }

  downloadLinkStaticData: {
    domains: string[];
    text: string;
    icon: string;
  }[] = [
    {
      domains: ['store.steampowered.com'],
      text: 'on Steam',
      icon: 'steam',
    },
    {
      domains: ['itch.io'],
      text: 'on Itch',
      icon: 'itchdotio',
    },
  ];

  defaultDownloadLinkStaticData = {
    text: 'here',
    icon: 'play',
  };

  getDownloadLinkStaticData(link: string | undefined) {
    if (!link) return this.defaultDownloadLinkStaticData;
    const result = this.downloadLinkStaticData.find((x) => x.domains.some((domain) => link.includes(domain)));
    if (result) return result;
    return this.defaultDownloadLinkStaticData;
  }

  onDownloadLinkClick(link: string | undefined) {
    if (link) window.open(link, '_blank');
  }

  getDateString(date: number) {
    return new Date(date).toLocaleString();
  }

  getProjectYear() {
    return new Date(this.project.createdAt).getFullYear();
  }

  getVisibleSlides() {
    if (this.breakpointManager.matchedBreakpointOrAbove(Breakpoint.Desktop)) return 3;
    if (this.breakpointManager.matchedBreakpointOrAbove(Breakpoint.Mobile)) return 2;
    return 1;
  }
}
