import { NgModule, SecurityContext } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCommonModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { HomeComponent } from '@pages/home/home.component';
import { CalendarComponent } from '@pages/calendar/calendar.component';
import { ProjectsComponent } from '@app/pages/projects/projects.component';
import { PicturesComponent } from '@pages/pictures/pictures.component';
import { ResourcesComponent } from '@pages/resources/resources.component';
import { ScarletGameJamComponent } from '@pages/scarlet-game-jam/scarlet-game-jam.component';
import { CardComponent } from '@components/cards/card/card.component';
import { CardGridComponent } from '@components/card-grid/card-grid.component';
import { SectionComponent } from '@components/section/section.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FullPageHeaderComponent } from './components/full-page-header/full-page-header.component';
import { SiteHeaderComponent } from './components/site-header/site-header.component';
import { SiteFooterComponent } from './components/site-footer/site-footer.component';
import { HorizontalMenuComponent } from './components/horizontal-menu/horizontal-menu.component';
import { HamburgerMenuComponent } from './components/hamburger-menu/hamburger-menu.component';
import { TextButtonComponent } from './components/text-button/text-button.component';
import { BgContainerComponent } from './components/bg-container/bg-container.component';
import { DarkModeToggleComponent } from './components/dark-mode-toggle/dark-mode-toggle.component';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { ImageGalleryItemComponent } from './components/image-gallery-item/image-gallery-item.component';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { ResourcePanelComponent } from './components/resource-panel/resource-panel.component';
import { ResourceItemComponent } from './components/resource-item/resource-item.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { CogsLogoTextButtonComponent } from './components/cogs-logo-text-button/cogs-logo-text-button.component';
import { HeaderSocialMediaButtonsComponent } from './components/header-social-media-buttons/header-social-media-buttons.component';
import { FooterSocialMediaButtonsComponent } from './components/footer-social-media-buttons/footer-social-media-buttons.component';
import { FilterHeaderComponent } from './components/filter-header/filter-header.component';
import { SubSectionComponent } from './components/sub-section/sub-section.component';

import { LoginComponent } from './pages/login/login.component'
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './pages/signup/signup.component';
import { MatButtonModifierDirective } from './directives/mat-button-modifier.directive';
import { UserComponent } from './pages/user/user.component';
import { ProjectsDisplayComponent } from '@app/components/projects-display/projects-display.component';
import { SocialButtonComponent } from './components/social-button/social-button.component';

import { QuestionPanelComponent } from './components/question-panel/question-panel.component';
import { ColumnLayoutComponent } from './components/column-layout/column-layout.component';
import { EventHeaderComponent } from './components/event-header/event-header.component';

import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { MarkdownNavModule } from './modules/markdown-nav/markdown-nav.module';
import { HttpClientModule } from '@angular/common/http';
import { ArticlesComponent } from './pages/articles/articles.component';
import { BlogComponent } from './pages/blog/blog.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ArticleItemComponent } from './components/article-item/article-item.component';
import { GraphQLModule } from './modules/graphql/graphql.module';
import { EditableSocialButtonComponent } from './components/editable-social-button/editable-social-button.component';
import { IconModule } from '@visurel/iconify-angular';
import { UsersComponent } from './pages/users/users.component';
import { RolesModule } from '@src/app/modules/roles/roles.module'; 
import { TagsModule } from '@src/app/modules/tags/tags.module';
import { AvatarModule } from './modules/avatar/avatar.module';
import { ProfileModule } from './modules/profile/profile.module';
import { UsersDisplayComponent } from './components/users-display/users-display.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    HomeComponent,
    CalendarComponent,
    ProjectsComponent,
    PicturesComponent,
    ResourcesComponent,
    ScarletGameJamComponent,
    CardComponent,
    CardGridComponent,
    SectionComponent,
    PageHeaderComponent,
    FullPageHeaderComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    HorizontalMenuComponent,
    HamburgerMenuComponent,
    TextButtonComponent,
    BgContainerComponent,
    DarkModeToggleComponent,
    ImageGalleryComponent,
    ImageGalleryItemComponent,
    ProjectItemComponent,
    ResourcePanelComponent,
    ResourceItemComponent,
    EventCardComponent,
    CogsLogoTextButtonComponent,
    HeaderSocialMediaButtonsComponent,
    FooterSocialMediaButtonsComponent,
    FilterHeaderComponent,
    SubSectionComponent,
    LoginComponent,
    SignupComponent,
    MatButtonModifierDirective,
    UserComponent,
    ProjectsDisplayComponent,
    SocialButtonComponent,
    QuestionPanelComponent,
    ColumnLayoutComponent,
    EventHeaderComponent,
    ArticlesComponent,
    BlogComponent,
    PaginatorComponent,
    ArticleItemComponent,
    EditableSocialButtonComponent,
    UsersComponent,
    UsersDisplayComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCommonModule,
    MatMomentDateModule,
    LayoutModule,
    MatToolbarModule,
    MatExpansionModule,
    MatListModule,
    MatDividerModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientModule,
    MarkdownNavModule,
    MatButtonToggleModule,
    IconModule,
    RolesModule,
    TagsModule,
    AvatarModule,
    ProfileModule,
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE
    }),
    GraphQLModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// TODO NOW: Fix error: "If 'app-page-header' is an Angular component, then verify that it is part of this module."