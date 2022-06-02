import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { BreakpointManagerService } from '@app/services/breakpoint-manager.service';
import { FilterHeaderComponent } from '@src/app/components/filter-header/filter-header.component';
import { ApolloContext } from '@src/app/modules/graphql/graphql.module';
import { BackendService } from '@src/app/services/backend.service';
import { ScrollService } from '@src/app/services/scroll.service';
import { User } from '@src/generated/graphql-endpoint.types';
import { gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit {
  
  @ViewChild(FilterHeaderComponent) filterHeader: FilterHeaderComponent | undefined;
  @ViewChild('usersContainer') usersContainer: ElementRef | undefined;
  users: Partial<User>[] = [];

  private usersQuerySubscription: Subscription | undefined;

  constructor(
    private scrollService: ScrollService,
    private backend: BackendService,
  ) { 
    scrollService.scrolledToBottom.subscribe(() => {
      
    });
    this.initUsers();

    this.usersQuerySubscription = this.backend.watchQuery<{
      users: {
        // Result type
        avatarLink: string, 
        displayName: string,
        username: string,
        bio: string,
      }[]
    }>({
      query: gql`
        query {
          users {
            avatarLink
            displayName
            username
          }
        }
      `,
      context: <ApolloContext>{
        authenticate: true,
      }
    })
    .valueChanges.subscribe(({data}) => {
      this.users = data.users;
    });
  }

  // TODO: Remove this in production
  initUsers() {
    const base = [
      {
        avatarLink: "https://pfps.gg/assets/pfps/6721-rimuru-tempest.png",
        username: "Atlinx",
        displayName: "At Lynx"
      },
      {
        avatarLink: "https://pfps.gg/assets/pfps/5081-anime-girl-with-pink-hair.png",
        username: "Linx38",
        displayName: "Linx"
      },
      {
        avatarLink: "https://pfps.gg/assets/pfps/9018-super-cute-anime-girl-with-brown-eyes.png",
        username: "93tsyu",
        displayName: "Tsu Yu"
      }
    ];
    for (let i = 0; i < 50; i++)
      this.users = this.users.concat(base);
  }
}