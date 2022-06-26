import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@src/app/services/auth.service';

@Component({
  selector: 'app-site-left-side-bar',
  templateUrl: './site-left-side-bar.component.html',
  styleUrls: ['./site-left-side-bar.component.css'],
})
export class SiteLeftSideBarComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  onProfileClick() {
    this.router.navigateByUrl(`/members/${this.authService.getPayload()?.user.username}`);
  }
}
