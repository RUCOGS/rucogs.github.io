import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProcessMonitor } from '@src/app/classes/process-monitor';
import { BackendService } from '@src/app/services/backend.service';
import { SecurityService } from '@src/app/services/_services.module';
import { Access } from '@src/generated/graphql-endpoint.types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-new-project-page',
  templateUrl: './new-project-page.component.html',
  styleUrls: ['./new-project-page.component.css']
})
export class NewProjectPageComponent implements OnDestroy {

  form: FormGroup;

  monitor = new ProcessMonitor();
  onDestroy$ = new Subject<void>();

  constructor(
    formBuilder: FormBuilder,
    private backend: BackendService,
    private router: Router,
    private security: SecurityService,
  ) { 
    this.form = formBuilder.group({
      name: [null, [Validators.required]],
      access: [null, [Validators.required]],
      pitch: [null, [Validators.required]],
    })

    this.form.get('access')?.setValue(Access.Open);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  onSubmit() {
    if (this.monitor.isProcessing || !this.form.valid)
      return;
    
    this.monitor.addProcess();

    const uploadFormData = new FormData();
    uploadFormData.set('name', this.form.get('name')?.value);
    uploadFormData.set('access', this.form.get('access')?.value);
    uploadFormData.set('pitch', this.form.get('pitch')?.value);

    this.backend
      .withAuth()
      .post<{
        data: {
          id: string,
        }
      }>(
        "/upload/project/new", 
        uploadFormData
      )
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        error: (error) => {
          this.monitor.removeProcess();
        },
        next: async(value) => {
          await this.security.fetchData();
          this.router.navigateByUrl(`/projects/${value.data.id}`);
        },
        complete: () => {
          this.monitor.removeProcess();
        }
      });
  }
}
