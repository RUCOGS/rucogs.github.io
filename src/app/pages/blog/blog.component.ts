import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  article: string = "";

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    var articleParam = this.activatedRoute.snapshot.paramMap.get('article');
    if (articleParam) {
      this.article = articleParam;
    }
  }

}
