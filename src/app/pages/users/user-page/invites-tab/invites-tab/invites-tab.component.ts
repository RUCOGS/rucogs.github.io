import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { defaultUserOptions, UserOptions } from '@pages/users/user-page/classes';
import { ProcessMonitor } from '@src/app/classes/process-monitor';
import { FilterHeaderComponent } from '@src/app/modules/filtering/filtering.module';
import { BackendService } from '@src/app/services/backend.service';
import { BreakpointManagerService } from '@src/app/services/breakpoint-manager.service';
import { deepClone } from '@src/app/utils/utils';
import { ProjectInvite, User } from '@src/generated/graphql-endpoint.types';
import { gql } from 'apollo-angular';
import { firstValueFrom, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PartialDeep } from 'type-fest';

@Component({
  selector: 'app-invites-tab',
  templateUrl: './invites-tab.component.html',
  styleUrls: ['./invites-tab.component.css'],
})
export class InvitesTabComponent implements OnChanges, OnDestroy, AfterViewInit {
  @Output() edited = new EventEmitter();

  @Input() user: PartialDeep<User> = {};
  @Input() userOptions: UserOptions = defaultUserOptions();

  @ViewChild(FilterHeaderComponent) filterHeader: FilterHeaderComponent | undefined;

  monitor = new ProcessMonitor();
  displayedColumns: string[] = ['project', 'type', 'buttons'];
  filteredInvites: PartialDeep<ProjectInvite>[] = [];

  protected onDestroy$ = new Subject<void>();

  constructor(private backend: BackendService, private breakpointManager: BreakpointManagerService) {}

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      this.monitor.removeProcess();
      if (this.user.projectInvites)
        this.filteredInvites = deepClone(this.user.projectInvites) as PartialDeep<ProjectInvite>[];
    }
  }

  ngAfterViewInit(): void {
    if (!this.filterHeader) return;

    this.filterHeader.newSearchRequest.pipe(takeUntil(this.onDestroy$)).subscribe(this.onNewSearchRequest.bind(this));
  }

  onNewSearchRequest(searchText: string) {
    if (searchText === '') {
      this.filteredInvites = deepClone(this.user.projectInvites) as PartialDeep<ProjectInvite>[];
    } else {
      this.filteredInvites = (this.user.projectInvites as PartialDeep<ProjectInvite>[])!.filter(
        (x) => x.project!.name!.indexOf(searchText) > -1,
      );
      this.filteredInvites = this.filteredInvites.sort((a, b) => {
        return b.project!.name!.indexOf(searchText) - a.project!.name!.indexOf(searchText);
      });
    }
  }

  async onAcceptInvite(invite: PartialDeep<ProjectInvite>) {
    if (this.monitor.isProcessing) return;
    this.monitor.addProcess();
    const result = await firstValueFrom(
      this.backend.withAuth().mutate<boolean>({
        mutation: gql`
          mutation AcceptProjectInvite($inviteId: ID!) {
            acceptProjectInvite(inviteId: $inviteId)
          }
        `,
        variables: {
          inviteId: invite.id,
        },
      }),
    );

    if (result.errors) return;

    // Handled by subscription instead
    // this.edited.emit();
  }

  async onRejectInvite(invite: PartialDeep<ProjectInvite>) {
    if (this.monitor.isProcessing) return;
    this.monitor.addProcess();
    const result = await firstValueFrom(
      this.backend.withAuth().mutate<boolean>({
        mutation: gql`
          mutation RejectProjectInvite($inviteId: ID!) {
            deleteProjectInvite(inviteId: $inviteId)
          }
        `,
        variables: {
          inviteId: invite.id,
        },
      }),
    );

    if (result.errors) return;

    // Handled by subscription instead
    // this.edited.emit();
  }
}
