import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { AvatarModule } from '../avatar/avatar.module';
import { RolesModule } from '../roles/roles.module';
import { TagsModule } from '../tags/tags.module';
import { UserModule } from '../user/user.module';
import { CoreModule } from '../_core/core.module';
import { EboardProfileComponent } from './eboard-profile/eboard-profile.component';
import { EBoardTermGroupComponent } from './eboard-term-group/eboard-term-group.component';
import { EBoardTermProfileComponent } from './eboard-term-profile/eboard-term-profile.component';

export * from './eboard-term-group/eboard-term-group.component';

@NgModule({
  declarations: [EBoardTermGroupComponent, EBoardTermProfileComponent, EboardProfileComponent],
  imports: [CommonModule, CoreModule, RolesModule, AvatarModule, UserModule, MatDividerModule, TagsModule],
  exports: [EBoardTermGroupComponent, EBoardTermProfileComponent, EboardProfileComponent],
})
export class EBoardModule {}
