import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, Optional, Self } from '@angular/core';
import { NgControl, UntypedFormControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { BaseCustomInputComponent } from '@app/modules/base-custom-input/base-custom-input.module';
import { BackendService } from '@src/app/services/backend.service';
import { CdnService } from '@src/app/services/cdn.service';
import { User } from '@src/generated/graphql-endpoint.types';
import { UserFilterInput, UserSortInput } from '@src/generated/model.types';
import { gql } from 'apollo-angular';
import { firstValueFrom, ReplaySubject } from 'rxjs';
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
export class UserInputComponent extends BaseCustomInputComponent<string> implements OnInit {

  inputControl = new UntypedFormControl();
  filteredUsers$ = new ReplaySubject<PartialDeep<User>[]>();
  isEnteringNewUser = true;
  
  get user(): PartialDeep<User> | null {
    return this._user;
  }
  set user(user: PartialDeep<User> | null) {
    this._user = user;
    this.value = user?.id ? user.id : null;
  }
  private _user: PartialDeep<User> | null = null;

//#region // ----- BaseCustomInputComponent ----- //
  static nextId = 0;
  get empty() {
    return this.value === "";
  }

  public controlType: string = `app-user-input`;
  public id: string = `${this.controlType}-${UserInputComponent.nextId++}`;
//#engregion // -- BaseCustomInputComponent ----- //

  constructor(
    public cdn: CdnService,
    private backend: BackendService,

    focusMonitor: FocusMonitor,
    elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() ngControl: NgControl,
  ) {
    super(
      focusMonitor, 
      elementRef, 
      ngControl
    );
  }

  ngOnInit(): void {
    if (this.user != null) {
      this.inputControl.setValue(this.user.username, {
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

            this.user = null;

            if (!this.isEnteringNewUser) {
              this.inputControl.setValue(value.replace("[object Object]", ""), { 
                emitEvent: false 
              });
              this.isEnteringNewUser = true;
            }
          } else {
            this.user = value;
            
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

  async fetchSearchedUsers(searchedUsername: string): Promise<PartialDeep<User>[]> {
    searchedUsername = searchedUsername.toLowerCase();

    const startMatches = await firstValueFrom(this.backend.query<{
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
    }));
    if (startMatches.error)
      return [];

    return startMatches.data.users; 
  }

  onAutoCompleteOptionSelected() {
    this.isEnteringNewUser = false;
  }
}
