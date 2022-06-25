import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProcessMonitor } from '@src/app/classes/process-monitor';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { BackendService } from '@src/app/services/backend.service';
import { EBoardTerm, NewEBoardInput, RoleCode, User } from '@src/generated/graphql-endpoint.types';
import { gql } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';
import { PartialDeep } from 'type-fest';
import { AddEboardTermDialogComponent, AddEboardTermDialogData } from '../add-eboard-term-dialog/add-eboard-term-dialog.component';
import { EditEboardDialogComponent, EditEBoardDialogData } from '../edit-eboard-dialog/edit-eboard-dialog.component';
import { EditEboardTermDialogComponent, EditEBoardTermDialogData } from '../edit-eboard-term-dialog/edit-eboard-term-dialog.component';
import { defaultUserOptions, UserOptions } from '../user-page/user-page.component';

@Component({
  selector: 'app-eboard-tab',
  templateUrl: './eboard-tab.component.html',
  styleUrls: ['./eboard-tab.component.css']
})
export class EboardTabComponent {

  @Output() edited = new EventEmitter();

  @Input() user: PartialDeep<User> = {};
  @Input() userOptions: UserOptions = defaultUserOptions();

  displayedColumns: string[] = ['year', 'roles', 'buttons'];
  monitor = new ProcessMonitor();

  constructor(
    private uiMessage: UIMessageService,
    private backend: BackendService,
    private dialog: MatDialog,
  ) { }

  getEBoardTerms() {
    return this.user.eBoard?.terms ?? [];
  }

  getTermRoles(term: PartialDeep<EBoardTerm>) {
    return term.roles?.map(x => x?.roleCode as RoleCode) ?? [];
  }

  async onAddTerm() {
    const success = await firstValueFrom(this.dialog.open(AddEboardTermDialogComponent, {
      data: <AddEboardTermDialogData>{
        eBoardId: this.user.eBoard?.id,
        takenYears: this.user.eBoard?.terms?.map(x => x?.year) ?? [],
      },
      width: "37.5em",
      maxWidth: '90vw',
    }).afterClosed());
    if (!success)
      return;
    this.edited.emit();
  }

  async onEditTerm(term: PartialDeep<EBoardTerm>) {
    const success = await firstValueFrom(this.dialog.open(EditEboardTermDialogComponent, {
      data: <EditEBoardTermDialogData>{
        term,
        takenYears: this.user.eBoard?.terms?.map(x => x?.year) ?? [],
        userOptions: this.userOptions
      },
      width: "37.5em",
      maxWidth: '90vw',
    }).afterClosed());
    if (!success)
      return;
    this.edited.emit();
  }

  async onDeleteTerm(term: PartialDeep<EBoardTerm>) {
    const success = await firstValueFrom(this.uiMessage.confirmDialog('Are you sure you want to delete this term?'));
    if (!success)
      return;
    const result = await firstValueFrom(this.backend.withAuth().mutate({
      mutation: gql`
        mutation DeleteEBoardTerm($id: ID!) {
          deleteEBoardTerm(id: $id)
        }
      `,
      variables: {
        id: term.id
      }
    }));
    if (result.errors)
      return;
    this.uiMessage.notifyInfo("Term deleted!");
    this.edited.emit();
  }

  async onCreateEBoard() {
    const success = await firstValueFrom(this.uiMessage.confirmDialog('Are you sure you want to create an e-board profile?'));
    if (!success)
      return;
    const result = await firstValueFrom(this.backend.withAuth().mutate({
      mutation: gql`
        mutation NewEBoard($input: NewEBoardInput!) {
          newEBoard(input: $input)
        }
      `,
      variables: {
        input: <NewEBoardInput>{
          userId: this.user.id
        }
      }
    }));
    if (result.errors)
      return;
    this.uiMessage.notifyConfirmed("EBoard profile created!");
    this.edited.emit();
  }

  async onEditEBoard() {
    const success = await firstValueFrom(this.dialog.open(EditEboardDialogComponent, {
      data: <EditEBoardDialogData>{
        eBoard: this.user.eBoard
      },
      width: "37.5em",
      maxWidth: '90vw',
    }).afterClosed());
    if (!success)
      return;
    this.edited.emit();
  }

  async onDeleteEBoard() {
    const success = await firstValueFrom(this.uiMessage.confirmDialog('Are you sure you want to delete the e-board profile?'));
    if (!success)
      return;
    const result = await firstValueFrom(this.backend.withAuth().mutate({
      mutation: gql`
        mutation DeleteEBoard($id: ID!) {
          deleteEBoard(id: $id)
        }
      `,
      variables: {
        id: this.user.eBoard?.id
      }
    }));
    console.log('finish')
    console.log(result.errors);
    if (result.errors)
      return;
    this.uiMessage.notifyConfirmed("EBoard profile created!");
    this.edited.emit();
  }
}
