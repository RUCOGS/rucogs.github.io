import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FilteringModule } from '@src/app/modules/filtering/filtering.module';
import { ProjectModule } from '@src/app/modules/project/project.module';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { InvitesTabComponent } from './invites-tab/invites-tab.component';

@NgModule({
  declarations: [InvitesTabComponent],
  imports: [CommonModule, CoreModule, FilteringModule, ProjectModule, MatIconModule, FilteringModule, MatTableModule],
  exports: [InvitesTabComponent],
})
export class InvitesTabModule {}
