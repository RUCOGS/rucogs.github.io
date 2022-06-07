import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { BackendService } from '@src/app/services/backend.service';
import { CdnService } from '@src/app/services/cdn.service';
import { User, UserFilterInput, UserSortInput } from '@src/generated/graphql-endpoint.types';
import { gql } from 'apollo-angular';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PartialDeep } from 'type-fest';

// Input that returns the id of the selected user.
@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: UserInputComponent,
    }
  ]
})
export class UserInputComponent implements OnInit, ControlValueAccessor, MatFormFieldControl<PartialDeep<User>>, OnDestroy {
  static nextId = 0;

  stateChanges = new Subject<void>();
  focused: boolean = false;
  errorState: boolean = false;
  controlType = 'app-user-input';
  id: string = `app-user-input-${UserInputComponent.nextId++}`;
  onChange: any = (_: any) => { };
  onTouched: any = () => { };

  get empty() {
    return this.value === "";
  }
  
  get shouldLabelFloat() { 
    return this.focused || !this.empty; 
  }
  
  @Input()
  get placeholder(): string { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string = "";

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.inputControl.disable() : this.inputControl.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value() {
    return this._value;
  }
  set value(value: PartialDeep<User> | null) {
    const oldValue = this._value;
    this._value = value;
    if (
      (!this._value && oldValue) ||
      (this._value && !oldValue) ||
      (
        this.value 
        && oldValue 
        && oldValue?.id != this._value?.id
      )
    ) {
      this.onChange(this.value?.id);
      this.markAsTouched();
    }
  }
  private _value: PartialDeep<User> | null = null;

//#region // ----- ORIGINAL VARS ----- //
  inputControl = new FormControl();
  touched = false;
  filteredUsers$ = new ReplaySubject<PartialDeep<User>[]>();
  isEnteringNewUser = true;
  @HostBinding('attr.aria-describedby') describedBy = '';

  private onDestroy$ = new Subject<void>();
//#endregion // -- ORIGINAL VARS ----- //


  constructor(
    public cdn: CdnService,
    private backend: BackendService,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl,
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    _focusMonitor.monitor(_elementRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    if (this.value != null) {
      this.inputControl.setValue(this.value.username, {
        emitEvent: false
      });
      this.isEnteringNewUser = false;
    }
    
    this.inputControl.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: async (value: string | User) => {
          if (typeof value === 'string') {
            this.filteredUsers$.next(await this.fetchSearchedUsers(value));

            this.value = null;

            if (!this.isEnteringNewUser) {
              this.inputControl.setValue(value.replace("[object Object]", ""), { 
                emitEvent: false 
              });
              this.isEnteringNewUser = true;
            }
          } else {
            this.value = value;
            
            this.inputControl.setValue(value.username, {
              emitEvent: false
            })
          }
          // Else this is just the autocomplete
          // changing the inputControl, therefore
          // we don't have to do anything.
        }
      });
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' '); 
  }

  onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this._elementRef.nativeElement.querySelector('input')!.focus();
    }
  }

  writeValue(value: PartialDeep<User> | null): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  async fetchSearchedUsers(searchedUsername: string): Promise<PartialDeep<User>[]> {
    searchedUsername = searchedUsername.toLowerCase();

    const startMatches = await this.backend.query<{
      users: {
        id: string,
        username: string,
        displayName: string,
        avatarLink: string,
      }[]
    }>({
      query: gql`
        query($filter: UserFilterInput, $sorts: [UserSortInput!], $limit: Int) {
          users(filter: $filter, sorts: $sorts, limit: $limit) {
            id
            username
            displayName
            avatarLink
          }
        }
      `,
      variables: {
        // Pagination
        // TODO EVENTUALLY: Use cursor pagination once Typetta suppoorts that
        limit: 10,
        filter: searchedUsername ? <UserFilterInput>{
          username: { 
            startsWith: searchedUsername, 
            mode: 'INSENSITIVE' 
          }
        } : {},
        sorts: [
          <UserSortInput>{
            username: 'asc'
          }
        ]
      }
    }).toPromise();
    if (startMatches.error)
      return [];

    return startMatches.data.users; 
  }

  onAutoCompleteOptionSelected() {
    this.isEnteringNewUser = false;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
