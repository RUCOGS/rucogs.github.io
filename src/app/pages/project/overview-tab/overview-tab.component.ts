import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Color } from '@src/app/classes/_classes.module';
import { CdnService } from '@src/app/services/_services.module';
import { Project, ProjectMember } from '@src/generated/graphql-endpoint.types';
import { SettingsService } from '@src/_settings';
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

  private setupBannerColorListener = false;

  constructor(
    private cdnService: CdnService,
    private settings: SettingsService,
    private dialog: MatDialog,
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

  join() {
    
  }
  
  requestInvite() {
    
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