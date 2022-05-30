import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SOCIAL_PLATFORMS, UserSocial as UserSocial } from '@app/utils/user-social';

@Component({
  selector: 'app-editable-social-button',
  templateUrl: './editable-social-button.component.html',
  styleUrls: ['./editable-social-button.component.css']
})
export class EditableSocialButtonComponent implements OnInit {
  @Input() userSocial: UserSocial | undefined;

  @Input() icon: string = "";
  @Input() username: string = "";
  @Input() link: string = "";

  form: FormGroup;
  platform = new FormControl();


  constructor(private formBuilder: FormBuilder) { 
    this.form = formBuilder.group({
      platform: [null, [Validators.required]],
      username: [null, [Validators.required]],
      url: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
    if (this.userSocial) {
      const platform = SOCIAL_PLATFORMS[this.userSocial.platform];
      this.icon = platform.icon;
      this.link = this.userSocial.link;
      this.username = this.userSocial.username;
    }
  }

  onClick() {
    window.open(this.link, '_blank');
  }

  getSocialPlatforms() {
    return SOCIAL_PLATFORMS;
  }

  getSocialPlatformData(platform: string) {
    return SOCIAL_PLATFORMS[platform];
  }
}
