import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProcessMonitor } from '@src/app/classes/process-monitor';
import { BackendService } from '@src/app/services/backend.service';
import { SecurityService } from '@src/app/services/_services.module';
import { Access, NewProjectInput } from '@src/generated/graphql-endpoint.types';
import { gql } from 'apollo-angular';
import { finalize, first } from 'rxjs/operators';

@Component({
  selector: 'app-new-project-page',
  templateUrl: './new-project-page.component.html',
  styleUrls: ['./new-project-page.component.css'],
})
export class NewProjectPageComponent {
  form: UntypedFormGroup;

  monitor = new ProcessMonitor();

  constructor(
    formBuilder: UntypedFormBuilder,
    private backend: BackendService,
    private router: Router,
    private security: SecurityService,
  ) {
    this.form = formBuilder.group({
      name: [null, [Validators.required]],
      access: [null, [Validators.required]],
      pitch: [null, [Validators.required]],
    });

    this.form.get('access')?.setValue(Access.Open);
  }

  onSubmit() {
    if (this.monitor.isProcessing || !this.form.valid) return;

    this.monitor.addProcess();

    const input = <NewProjectInput>{
      name: this.form.get('name')?.value,
      access: this.form.get('access')?.value,
      pitch: this.form.get('pitch')?.value,
    };

    this.backend
      .withAuth()
      .mutate<{
        newProject: string;
      }>({
        mutation: gql`
          mutation ($input: NewProjectInput!) {
            newProject(input: $input)
          }
        `,
        variables: {
          input,
        },
      })
      .pipe(
        first(),
        finalize(() => {
          this.monitor.removeProcess();
        }),
      )
      .subscribe({
        next: async (value) => {
          if (!value.data?.newProject) return;

          this.router.navigateByUrl(`/projects/${value.data.newProject}`);
        },
      });
  }
}
