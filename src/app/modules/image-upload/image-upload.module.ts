import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ClassesModule } from '@src/app/classes/_classes.module';
import { UtilsModule } from '@src/app/utils/_utils.module';
import { BaseCustomInputModule } from '../base-custom-input/base-custom-input.module';
import { ButtonStylesModule } from '../button-styles/button-styles.module';
import { CardsModule } from '../cards/cards.module';
import { UIMessageModule } from '../ui-message/ui-message.module';
import { GalleryUploadComponent } from './gallery-upload/gallery-upload.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';

export { ImageUploadComponent };

@NgModule({
  declarations: [ImageUploadComponent, GalleryUploadComponent],
  imports: [
    CommonModule,
    UtilsModule,
    MatButtonModule,
    MatIconModule,
    UIMessageModule,
    BaseCustomInputModule,
    ClassesModule,
    CardsModule,
    DragDropModule,
    ButtonStylesModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
  exports: [ImageUploadComponent, GalleryUploadComponent],
})
export class ImageUploadModule {}
