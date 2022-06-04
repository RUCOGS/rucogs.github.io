import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SOCIAL_PLATFORMS } from '@src/app/settings/_settings.module';
import { UserSocial } from '@src/generated/graphql-endpoint.types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class UserSocialEdit {
  constructor(
    public userSocial: Partial<UserSocial> = {},
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
export class EditableSocialButtonComponent implements OnInit, OnDestroy {
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();

  @Input() userSocialEdit: UserSocialEdit = new UserSocialEdit();

  form: FormGroup;
  get platform() {
    return this.form.get('platform');
  }

  private onDestroy$ = new Subject<void>();
  
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
    this.form.get('platform')?.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe({
      next: (value: string) => {
        this.userSocialEdit.userSocial.platform = value;
        this.edit.emit();
      }
    });
    this.form.get('username')?.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe({
      next: (value: string) => {
        this.userSocialEdit.userSocial.username = value;
        this.edit.emit();
      }
    });
    this.form.get('link')?.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe({
      next: (value: string) => {
        this.userSocialEdit.userSocial.link = value;
        this.edit.emit();
      }
    });
  }
  
  ngOnDestroy() {
    this.onDestroy$.next();
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
