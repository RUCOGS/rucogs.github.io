import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageUploadComponent } from '@src/app/modules/image-upload/image-upload.module';
import { BackendService } from '@src/app/services/backend.service';
import { UpdateUserInput } from '@src/generated/graphql-endpoint.types';
import { gql } from 'apollo-angular';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {

  @ViewChild('imageUpload') imageUpload?: ImageUploadComponent;

  constructor(
    private backend: BackendService
  ) { }

  ngOnInit(): void {
  }

  upload() {
    if (!this.imageUpload || !this.imageUpload.value)
      return;
    
    console.log("avatar upload start!");
    this.backend.mutate<{
      updateUser: boolean
    }>({
      mutation: gql`
        mutation($input: UpdateUserInput!) {
          updateUser(input: $input)
        }
      `,
      variables: {
        input: <UpdateUserInput>{
          avatar: this.imageUpload.value
        }
      }
    }).pipe(first())
    .subscribe({
      next: (value) => {
        if (value.data?.updateUser)
          console.log("avatar upload success!");
      }
    })
  }
}
