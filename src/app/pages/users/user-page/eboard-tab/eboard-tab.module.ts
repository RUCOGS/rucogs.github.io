import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { EBoardModule } from '@src/app/modules/eboard/eboard.module';
import { ImageUploadModule } from '@src/app/modules/image-upload/image-upload.module';
import { RolesModule } from '@src/app/modules/roles/roles.module';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { CreateEboardTermDialogComponent } from './create-eboard-term-dialog/create-eboard-term-dialog.component';
import { EboardTabComponent } from './eboard-tab/eboard-tab.component';
import { EditEboardDialogComponent } from './edit-eboard-dialog/edit-eboard-dialog.component';
import { EditEboardTermDialogComponent } from './edit-eboard-term-dialog/edit-eboard-term-dialog.component';

@NgModule({
  declarations: [
    CreateEboardTermDialogComponent,
    EboardTabComponent,
    EditEboardDialogComponent,
    EditEboardTermDialogComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    RolesModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    ImageUploadModule,
    MatInputModule,
    EBoardModule,
  ],
  exports: [EboardTabComponent],
})
export class EboardTabModule {}
