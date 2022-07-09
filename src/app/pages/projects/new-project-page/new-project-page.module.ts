import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Route, RouterModule } from '@angular/router';
import { ProjectModule } from '@src/app/modules/project/project.module';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { NewProjectPageComponent } from './new-project-page/new-project-page.component';

const ROUTES: Route[] = [{ path: '', component: NewProjectPageComponent }];

@NgModule({
  declarations: [NewProjectPageComponent],
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    CoreModule,
    ProjectModule,
    CoreModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class NewProjectPageModule {}
