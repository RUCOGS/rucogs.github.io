import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Color, ProcessMonitor } from '@src/app/classes/_classes.module';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { BackendService, CdnService, SecurityService } from '@src/app/services/_services.module';
import { InviteType, NewProjectInviteInput, Project, ProjectMember } from '@src/generated/graphql-endpoint.types';
import { SettingsService } from '@src/_settings';
import { gql } from 'apollo-angular';
import ColorThief from 'colorthief';
import { first } from 'rxjs/operators';
import { PartialDeep } from 'type-fest';
import { EditProjectDialogComponent, EditProjectDialogData } from '../edit-project-dialog/edit-project-dialog.component';
import { DefaultProjectOptions, ProjectOptions } from '../project-page/project-page.component';
import { AccessOptions } from '../_classes/utils';

@Component({
  selector: 'app-overview-tab',
  templateUrl: './overview-tab.component.html',
  styleUrls: ['./overview-tab.component.css']
})
export class OverviewTabComponent implements AfterViewChecked, OnChanges {

  @Output() edited = new EventEmitter();

  @Input() project: PartialDeep<Project> = {};
  @Input() projectOptions: ProjectOptions = DefaultProjectOptions;

  cardImageSrc: string = "https://c.tenor.com/Tu0MCmJ4TJUAAAAC/load-loading.gif";
  bannerSrc: string = "https://c.tenor.com/Tu0MCmJ4TJUAAAAC/load-loading.gif";
  bannerColor: Color | undefined;
  accessOptions = AccessOptions;

  monitor = new ProcessMonitor();

  private setupBannerColorListener = false;

  constructor(
    private cdnService: CdnService,
    private settings: SettingsService,
    private dialog: MatDialog,
    private backend: BackendService,
    private security: SecurityService,
    private uiMessageService: UIMessageService,
  ) {}

  // We can't use ngAfterViewInit because tab group triggers that despite not rendering the tab
  ngAfterViewChecked(): void {
    this.trySetupBannerColorListeners();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project']) {
      this.bannerSrc = this.project.bannerLink ? this.cdnService.getFileLink(this.project.bannerLink) : "";
      this.cardImageSrc = this.project.cardImageLink ? this.cdnService.getFileLink(this.project.cardImageLink) : this.settings.General.defaultCardImageSrc;
    }
  }
  
  getProjectMembers() {
    return this.project.members as PartialDeep<ProjectMember>[];
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

  async join() {
    if (this.monitor.isProcessing)
      return;
    
    this.monitor.addProcess();
    const result = await this.backend.withAuth().mutate<{
      newProjectInvite: boolean
    }>({
      mutation: gql`
        mutation($projectId: ID!) {
          joinOpenProject(projectId: $projectId)
        }
      `,
      variables: {
        projectId: this.project.id,
      }
    }).pipe(first()).toPromise();
    this.monitor.removeProcess();

    if (result.errors)
      return;
    
    this.edited.emit();

    this.uiMessageService.notifyConfirmed('Joined project!');
  }
  
  async requestInvite() {
    if (this.monitor.isProcessing)
      return;
    
    this.monitor.addProcess();
    const result = await this.backend.withAuth().mutate<{
      newProjectInvite: string
    }>({
      mutation: gql`
        mutation($input: NewProjectInviteInput!) {
          newProjectInvite(input: $input)
        }
      `,
      variables: {
        input: <NewProjectInviteInput>{
          type: InviteType.Incoming,
          projectId: this.project.id,
          userId: this.security.securityContext?.userId,
        }
      }
    }).pipe(first()).toPromise();
    this.monitor.removeProcess();

    if (result.errors)
      return;
    
    this.edited.emit();
    this.uiMessageService.notifyConfirmed('Invite sent!');
  }

  edit() {
    const dialog = this.dialog.open(EditProjectDialogComponent, {
      data: <EditProjectDialogData>{
        project: this.project
      },
      width: "600px"
    });
    dialog.afterClosed()
      .pipe(first())
      .subscribe({
        next: (value) => {
          if (value)
            this.edited.emit();
        } 
      });
  }
}