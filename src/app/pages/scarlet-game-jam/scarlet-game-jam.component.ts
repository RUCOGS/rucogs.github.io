import { Component, OnInit } from '@angular/core';
import { BreakpointManagerService } from '@app/services/breakpoint-manager.service';
declare var FlipDown: any;

@Component({
  selector: 'app-scarlet-game-jam',
  templateUrl: './scarlet-game-jam.component.html',
  styleUrls: ['./scarlet-game-jam.component.css'],
  host: {
    class: 'page'
  }
})
export class ScarletGameJamComponent implements OnInit {

  constructor(public breakpointManager: BreakpointManagerService) { }

  ngOnInit(): void {
    var finalDateSeconds = new Date("Nov 14, 2021 16:00:00 EST").getTime() / 1000;
    var flipdown = new FlipDown(finalDateSeconds, "sgj-countdown", {
        theme: "dark",
    }).start();
  }

}
