import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '@app/utils/project';
import { FileUtils } from '@app/utils/file-utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/utils/user'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  username: string = "";
  displayName: string = "";
  description: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  
  projects: Project[] = []

  isEditing: boolean = false;
  processingQueue: boolean[] = [];
  // 'processing' is set to true whenever we are processing an uplaod
  // or doing anything else asynchronously. This lets us disable uplaod controls
  // when we are still processing an image. 
  get processing(): boolean {
    return this.processingQueue.length > 0;
  }

  addProcess(): void {
    this.processingQueue.push(true);
  }

  removeProcess(): void {
    this.processingQueue.pop();
  }

  form: FormGroup;

  // The selected picture sources will become data URLs when
  // a new image is uploaded from the user's computer.
  selectedProfilePictureSrc: string = "";
  selectedProfileBackgroundSrc: string = "";
  selectedDisplayName: string = "";

  profilePictureSrc: string = "https://www.w3schools.com/css/paris.jpg";
  profileBackgroundSrc: string = "https://www.w3schools.com/css/paris.jpg";
  
  private activatedRouteSub: any;
  
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      displayName: [null, [Validators.required]],
      description: [null, []]
    })
  }
  
  // TODO Implement projects fetching.

  ngOnInit() {
    this.activatedRouteSub = this.activatedRoute.paramMap.subscribe(params => {
      this.username = params.get('username') as string;
      this.displayName = this.username;
      // TODO: fetch real display name;
    });
  }
  
  ngOnDestroy() {
    this.activatedRouteSub.unsubscribe();
  }

  editProfile() {
    this.isEditing = true;

    this.selectedProfilePictureSrc = this.profilePictureSrc;
    this.selectedProfileBackgroundSrc = this.profileBackgroundSrc;
    this.selectedDisplayName = this.displayName;

    this.form.get('displayName')?.setValue(this.displayName);
    this.form.get('description')?.setValue(this.description);
  }

  saveProfile() {
    this.isEditing = false;
    // TODO: handle sending new profile data to server
    
    // Upload profile picture
    const changeDataObj: any = {};

    if (this.selectedProfilePictureSrc != this.profileBackgroundSrc) {
      changeDataObj.profilePicture = this.selectedProfilePictureSrc;
    }

    // Upload background picture
    if (this.selectedProfileBackgroundSrc != this.profileBackgroundSrc) {
      changeDataObj.profileBackground = this.selectedProfilePictureSrc;
    }

    // If change data is not empty, meaning there were changes...
    if (Object.keys(changeDataObj).length > 0) {
      this.addProcess();
      this.http.post("http://localhost:8081/update/user/", changeDataObj).subscribe({
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.removeProcess();
        }
      });
    }
  }

  onProfilePictureChanged(event: any) {
    console.log('picture changed');
    if (this.processing) {
      return;
    }

    const file: File = event.target.files[0];
    
    if (file) {
      this.addProcess();
      FileUtils.ReadAsBase64(file)
        .then(result => {
          // Limit file size to less than 2 MB
          if (FileUtils.ByteToMB(FileUtils.Base64ToByteSize(result)) < 2) {
            this.selectedProfilePictureSrc = result;
          } else {
            // TODO: Make popup for errors
            console.log("File size is too big!");
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.removeProcess();
        });
    }
  }

  onProfileBackgroundChanged(event: any) {
    if (this.processing) {
      return;
    }
    
    const file: File = event.target.files[0];
    
    if (file) {
      this.addProcess();
      FileUtils.ReadAsBase64(file)
        .then(result => {
          // Limit file size to less than 2 MB
          if (FileUtils.ByteToMB(FileUtils.Base64ToByteSize(result)) < 2) {
            this.selectedProfileBackgroundSrc = result;
          } else {
            // TODO: Make popup for errors
            console.log("File size is too big!");
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.removeProcess();
        });
    }
  }
}