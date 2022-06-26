import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { RoleCode } from '@src/generated/graphql-endpoint.types';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RoleData } from '@src/shared/security';

@Component({
  selector: 'app-role-codes-editor',
  templateUrl: './role-codes-editor.component.html',
  styleUrls: ['./role-codes-editor.component.css'],
})
export class RoleCodesEditorComponent implements OnInit {
  @Output() rolesEdited = new EventEmitter();
  @Input() label: string = '';
  @Input() roles: RoleCode[] = [];
  @Input() allRoles: RoleCode[] = [];
  @Input() disabledRoles: RoleCode[] = [];
  @Input() disabled: boolean = false;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredRoles: Observable<RoleCode[]>;
  roleControl = new UntypedFormControl();

  @ViewChild('roleInput') roleInput!: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredRoles = this.roleControl.valueChanges.pipe(
      startWith(null),
      map((role: RoleCode | null) => this._filter(role)),
    );
  }

  ngOnInit(): void {}

  onRemoveRole(roleCode: RoleCode) {
    const index = this.roles.indexOf(roleCode);

    if (index >= 0) {
      this.roles.splice(index, 1);
      this.rolesEdited.emit();
    }

    this.roleControl.setValue(null);
  }

  onAddRoleChip(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if (this.validateNewRole(value)) {
      this.roles.push(value as RoleCode);
      this.rolesEdited.emit();
    }

    event.chipInput!.clear();
    this.roleControl.setValue(null);
  }

  onRoleAutoSelected(event: MatAutocompleteSelectedEvent) {
    if (!this.validateNewRole(event.option.value)) return;
    this.roles.push(event.option.value as RoleCode);
    this.roleInput.nativeElement.value = '';
    this.roleControl.setValue(null);
    this.rolesEdited.emit();
  }

  getRoleData(roleCode: RoleCode) {
    return RoleData[roleCode];
  }

  private validateNewRole(newRole: string) {
    return this.allRoles.includes(newRole as RoleCode) && !this.roles.includes(newRole as RoleCode);
  }

  private _filter(value: RoleCode | null): RoleCode[] {
    let validRoles = this.allRoles.filter((role) => !this.roles.includes(role));

    if (value) {
      const filterValue = value.toLowerCase();
      return validRoles.filter((role) => role.toLowerCase().includes(filterValue));
    }
    return validRoles;
  }
}
