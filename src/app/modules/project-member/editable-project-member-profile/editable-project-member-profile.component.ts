import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '@src/app/classes/custom-validators';
import { deepClone } from '@src/app/utils/utils';
import { ProjectMember, ProjectMemberRole, RoleCode, User } from '@src/generated/graphql-endpoint.types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PartialDeep } from 'type-fest';

export class ProjectMemberEdit {
  roles: RoleCode[] = [];

  constructor(
    public projectMember: PartialDeep<ProjectMember> = {},
    public acceptedRoles: RoleCode[] = [],
    public disabled: boolean = false,
    public deleteDisabled: boolean = false,
    public editor?: EditableProjectMemberProfileComponent,
  ) {
    this.projectMember = deepClone(projectMember);
    if (projectMember.roles)
      this.roles = projectMember.roles.map(x => x!.roleCode!);
    this.projectMember.roles = undefined;
  }

  public validate() {
    return this.editor?.validate();
  }

  public compositeValue() {
    const composite = deepClone(this.projectMember);
    composite.roles = this.roles
      .map(x => <ProjectMemberRole>{
        roleCode: x
      });
    return composite;
  }
}

@Component({
  selector: 'app-editable-project-member-profile',
  templateUrl: './editable-project-member-profile.component.html',
  styleUrls: ['./editable-project-member-profile.component.css']
})
export class EditableProjectMemberProfileComponent implements OnInit, OnDestroy {
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();

  @Input() projectMemberEdit: ProjectMemberEdit = new ProjectMemberEdit();

  form: UntypedFormGroup;

  get contributions() {
    return this.form.get('contributions');
  }

  get disabled() {
    return this.projectMemberEdit.disabled;
  }

  protected onDestroy$ = new Subject<void>();
  
  constructor(private formBuilder: UntypedFormBuilder) { 
    this.form = formBuilder.group({
      contributions: [null, []],
      user: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.projectMemberEdit.editor = this;
    if (this.projectMemberEdit.disabled) {
      this.form.disable();
    }
    this.form.get('user')?.setValue(this.projectMemberEdit.projectMember.user);
    this.form.get('contributions')?.setValue(this.projectMemberEdit.projectMember.contributions);
    this.form.get('roles')?.setValue(this.projectMemberEdit.projectMember.roles);
    this.form.get('user')?.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe({
      next: (value: PartialDeep<User> | null) => {
        this.projectMemberEdit.projectMember.user = value ?? undefined;
        this.edit.emit();
      }
    });
    this.form.get('contributions')?.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe({
      next: (value: string) => {
        this.projectMemberEdit.projectMember.contributions = value;
        this.edit.emit();
      }
    });
    this.form.get('roles')?.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe({
      next: (value: RoleCode[]) => {
        this.projectMemberEdit.roles = value;
        this.edit.emit();
      }
    });
  }
  
  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  validate() {
    this.form.updateValueAndValidity({
      emitEvent: true
    });
    return this.form.valid;
  }

  onDelete() {
    this.edit.emit();
    this.delete.emit();
  }

  onEditRoles() {
    this.edit.emit();
  }
}
