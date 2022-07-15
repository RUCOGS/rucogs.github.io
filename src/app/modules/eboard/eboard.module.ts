import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { AvatarModule } from '../avatar/avatar.module';
import { RolesModule } from '../roles/roles.module';
import { UserModule } from '../user/user.module';
import { EBoardTermGroupComponent } from './eboard-term-group/eboard-term-group.component';
import { EBoardTermProfileComponent } from './eboard-term-profile/eboard-term-profile.component';

export * from './eboard-term-group/eboard-term-group.component';

@NgModule({
  declarations: [EBoardTermGroupComponent, EBoardTermProfileComponent],
  imports: [CommonModule, RolesModule, AvatarModule, UserModule, MatDividerModule],
  exports: [EBoardTermGroupComponent, EBoardTermProfileComponent],
})
export class EBoardModule {}
