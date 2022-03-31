import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SettingsService } from '_settings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css' ],
  host: {
    class: 'page'
  },
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(public settings: SettingsService) { }

  ngOnInit(): void {

  for (let i = 0; i < 10; i++)
    console.error(`${i}
☢☢☢☢☢☢ ERROR ☢☢☢☢☢☢
 
 CONTAINMENT BREACHED

☢☢☢☢☢☢ ERROR ☢☢☢☢☢☢

  DROPPING EMERGENCY
  SERVER SSH LOGIN:

  IP: 192.155.91.123
  USERNAME: dev
  P̵̲͑̅͜A̵͗ͅṠ̸̼S̴̖̞͝W̴͈̪͊̾O̸̭͕̒́R̴̦̒Ď̴̠̬͝:̸͔͋ ̵̠̽C̶̼̺̈́r̸̨̋̅è̴͕t̴̡̘͗̆a̵̲̘͐e̶͙͖͝D̸̫̅̀

̸̟̓☢̶̠̭̌͝☢̴̜̺̅☺̴̥̼̓☺̶̡̤̇☺̶̡̤̇☢̴̤̼̂́ ̷͉̮̽̎E̸̯̍̓☾̵̜́R̸̟̳͝D̴͚̈́J̴̮̓ī̶̡̄ ̴̣͑☢̷͕͑©̷̻͛̓©̵̪̔ͅ☾̵̴̣͑☢̷͕̦͑☢☺̶̸̡̤̭̇̈́©̷̻͛̓©̵̪̔ͅ☾̵̝̍

  S̶T̴R̴E̴A̴M̶ ̵C̶O̶R̴R̵U̵P̶T̶E̴D̷
  ̵B̵A̵C̷K̷U̴P̷ ̴S̷O̶C̷I̶A̵L̶ ̸M̷E̸D̴I̷A̵
  S̸Y̶S̸T̵E̴M̴S̷ ̴E̶N̶G̸A̷G̷E̶D̴.̸.̸.̴ ̵

  ̷S̸U̶C̵C̵E̷S̷S̶S̸!̷

̸̟̓☢̶̠̭̌͝☢̴̜̺̅☺̴̥̼̓☺̶̡̤̇☺̶̡̤̇☢̴̤̼̂́ ̷͉̮̽̎E̸̯̍̓☾̵̜́R̸̟̳͝D̴͚̈́J̴̮̓ī̶̡̄ ̴̣͑☢̷͕͑©̷̻͛̓©̵̪̔ͅ☾̵☺̶̴̡̤̣̇͑☢̷͕̦͑☢̸̭̈́©̷̻͛̓©̵̪̔ͅ☾`);
  }

}
