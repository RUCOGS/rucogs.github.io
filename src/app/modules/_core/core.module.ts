import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BgContainerComponent } from './bg-container/bg-container.component';
import { ButtonComponent } from './button/button.component';
import { ColumnLayoutComponent } from './column-layout/column-layout.component';
import { EventCardComponent } from './event-card/event-card.component';
import { EventHeaderComponent } from './event-header/event-header.component';
import { FullPageHeaderComponent } from './full-page-header/full-page-header.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { QuestionPanelComponent } from './question-panel/question-panel.component';
import { SectionComponent } from './section/section.component';
import { SubSectionComponent } from './sub-section/sub-section.component';
import { TextButtonComponent } from './text-button/text-button.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { IconModule } from '@visurel/iconify-angular';
import { TagsModule } from '../tags/tags.module';
import { CardsModule } from '../cards/cards.module';
import { ButtonStylesModule } from '../button-styles/button-styles.module';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    BgContainerComponent,
    ButtonComponent,
    ColumnLayoutComponent,
    EventCardComponent,
    EventHeaderComponent,
    FullPageHeaderComponent,
    PageHeaderComponent,
    QuestionPanelComponent,
    SectionComponent,
    SubSectionComponent,
    TextButtonComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatDividerModule,
    MatExpansionModule,
    IconModule,
    TagsModule,
    CardsModule,
    ButtonStylesModule,
  ],
  exports: [
    ButtonStylesModule,
    MatButtonModule,
    BgContainerComponent,
    ButtonComponent,
    ColumnLayoutComponent,
    EventCardComponent,
    EventHeaderComponent,
    FullPageHeaderComponent,
    PageHeaderComponent,
    QuestionPanelComponent,
    SectionComponent,
    SubSectionComponent,
    TextButtonComponent
  ]
})
export class CoreModule { }
