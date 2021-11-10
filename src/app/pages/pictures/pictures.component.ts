import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.css'],
  host: {
    class: 'page'
  }
})
export class PicturesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
