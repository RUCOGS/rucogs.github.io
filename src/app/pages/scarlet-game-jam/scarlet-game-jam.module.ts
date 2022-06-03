import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScarletGameJamComponent } from './scarlet-game-jam/scarlet-game-jam.component';

export { ScarletGameJamComponent } from './scarlet-game-jam/scarlet-game-jam.component';


@NgModule({
  declarations: [
    ScarletGameJamComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ScarletGameJamComponent
  ]
})
export class ScarletGameJamModule { }
