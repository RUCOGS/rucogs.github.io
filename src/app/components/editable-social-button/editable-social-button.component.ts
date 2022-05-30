import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SOCIAL_PLATFORMS, UserSocial as UserSocial } from '@app/utils/user-social';

export class UserSocialEdit {
  constructor(
    public userSocial: UserSocial = {} as UserSocial,
    public editableSocialButton?: EditableSocialButtonComponent,
  ) {}

  public validate() {
    return this.editableSocialButton?.validate();
  }
}

@Component({
  selector: 'app-editable-social-button',
  templateUrl: './editable-social-button.component.html',
  styleUrls: ['./editable-social-button.component.css']
})
export class EditableSocialButtonComponent implements OnInit {
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();

  @Input() userSocialEdit: UserSocialEdit = new UserSocialEdit();

  form: FormGroup;
  get platform() {
    return this.form.get('platform');
  }
  
  constructor(private formBuilder: FormBuilder) { 
    this.form = formBuilder.group({
      platform: [null, [Validators.required]],
      username: [null, [Validators.required]],
      link: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.userSocialEdit.editableSocialButton = this;
    this.form.get('platform')?.setValue(this.userSocialEdit.userSocial.platform);
    this.form.get('username')?.setValue(this.userSocialEdit.userSocial.username);
    this.form.get('link')?.setValue(this.userSocialEdit.userSocial.link);
    this.form.get('platform')?.valueChanges.subscribe({
      next: (value: string) => {
        this.userSocialEdit.userSocial.platform = value;
        this.edit.emit();
      }
    });
    this.form.get('username')?.valueChanges.subscribe({
      next: (value: string) => {
        this.userSocialEdit.userSocial.username = value;
        this.edit.emit();
      }
    });
    this.form.get('link')?.valueChanges.subscribe({
      next: (value: string) => {
        this.userSocialEdit.userSocial.link = value;
        this.edit.emit();
      }
    });
  }

  validate() {
    this.form.updateValueAndValidity();
    return this.form.valid;
  }

  onDelete() {
    this.edit.emit();
    this.delete.emit();
  }

  getSocialPlatforms() {
    return SOCIAL_PLATFORMS;
  }

  getSocialPlatformData(platform: string) {
    return SOCIAL_PLATFORMS[platform];
  }
}
