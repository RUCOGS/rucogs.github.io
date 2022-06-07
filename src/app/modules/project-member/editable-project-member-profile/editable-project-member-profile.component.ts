import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '@src/app/classes/custom-validators';
import { ProjectMember, RoleCode } from '@src/generated/graphql-endpoint.types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class ProjectMemberEdit {
  roles: RoleCode[] = [];

  constructor(
    public projectMember: Partial<ProjectMember> = {},
    public editor?: EditableProjectMemberProfileComponent,
  ) {
    if (projectMember.roles)
      this.roles = projectMember.roles.map(x => x.roleCode);
  }

  public validate() {
    return this.editor?.validate();
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

  form: FormGroup;

  get contributions() {
    return this.form.get('contributions');
  }

  private onDestroy$ = new Subject<void>();
  
  constructor(private formBuilder: FormBuilder) { 
    this.form = formBuilder.group({
      // TODO NOW: Finis this after makign user search bar
      contributions: [null, [Validators.required]],
      user: [null, [CustomValidators.defined]]
    });
  }

  ngOnInit(): void {
    this.projectMemberEdit.editor = this;
    this.form.get('contributions')?.setValue(this.projectMemberEdit.projectMember.contributions);
    this.form.get('roles')?.setValue(this.projectMemberEdit.projectMember.roles);
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
  }

  validate() {
    this.form.updateValueAndValidity();
    return this.form.valid;
  }

  onDelete() {
    this.edit.emit();
    this.delete.emit();
  }
}
