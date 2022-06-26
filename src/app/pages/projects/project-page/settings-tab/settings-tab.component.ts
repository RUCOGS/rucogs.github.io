import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProcessMonitor } from '@src/app/classes/process-monitor';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { BackendService } from '@src/app/services/backend.service';
import { Project } from '@src/generated/graphql-endpoint.types';
import { gql } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';
import { PartialDeep } from 'type-fest';
import { defaultProjectOptions, ProjectOptions } from '../project-page/project-page.component';

@Component({
  selector: 'app-settings-tab',
  templateUrl: './settings-tab.component.html',
  styleUrls: ['./settings-tab.component.css'],
})
export class SettingsTabComponent implements OnInit {
  @Output() edited = new EventEmitter();

  @Input() project: PartialDeep<Project> = {};
  @Input() projectOptions: ProjectOptions = defaultProjectOptions();

  monitor = new ProcessMonitor();

  constructor(private uiMessageService: UIMessageService, private backend: BackendService, private router: Router) {}

  ngOnInit(): void {}

  async deleteProject() {
    const confirmed = await firstValueFrom(
      this.uiMessageService.confirmDialog(
        `Are you sure you want to delete the project "${this.project.name}"? There's no going back!`,
      ),
    );

    if (!confirmed) return;

    this.monitor.addProcess();
    const result = await firstValueFrom(
      this.backend.withAuth().mutate({
        mutation: gql`
          mutation DeleteProject($id: ID!) {
            deleteProject(id: $id)
          }
        `,
        variables: {
          id: this.project.id,
        },
      }),
    );
    this.monitor.removeProcess();

    if (result.errors) return;

    this.router.navigateByUrl('/projects');
  }

  getDeleteProjectTooltip() {
    if (!this.projectOptions.canDeleteProject) {
      return "Please ask an e-board officer if you'd like to delete a project.";
    }
    return '';
  }
}
