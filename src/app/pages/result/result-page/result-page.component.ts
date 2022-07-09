import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css'],
})
export class ResultPageComponent implements OnInit {
  title: string = '';
  body: string = '';

  constructor(private activatedRoute: ActivatedRoute, public router: Router) {}

  ngOnInit(): void {
    this.title = this.activatedRoute.snapshot.queryParamMap.get('title') ?? '';
    this.body = this.activatedRoute.snapshot.queryParamMap.get('body') ?? '';
  }
}
