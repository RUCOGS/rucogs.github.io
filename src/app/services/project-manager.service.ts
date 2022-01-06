import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { ProjectMember, Project } from '@app/utils/project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagerService {

  constructor() {}

  getProjects(): Observable<Project[]> {
    return new Observable(function (observer) {
      function promiseXHR(method, url) {
        return new Promise<XMLHttpRequest>(function (resolve, reject) {
          let xhr = new XMLHttpRequest();
          xhr.open(method, url);
          xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
              resolve(this);
            } else {
              reject(this);
            }
          };
          xhr.onerror = function () {
            reject(this);
          };
          xhr.send();
      });
      }

      async function imageExists(image_url) {
        let result;
        try {
          result = await promiseXHR('HEAD', image_url);
        } catch(err) {
          // Catches XHR failing due to image domain not having CORS enabled.
          return false;
        }
        return result.status !== 404;
      }

      var xhr = new XMLHttpRequest();
      xhr.open("GET", "https://sorrer.dev/cogsprojects.php?link", true);
      xhr.send();
      xhr.onreadystatechange = async function() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            var responseObj = JSON.parse(xhr.responseText);
            var arr: Project[] = [];
            var members = responseObj.members_info.reduce(function(map, member: ProjectMember) {
              map[member.member_id] = member;
              return map;
            }, {});

            for (let project of responseObj.projects_finished) {
              var currentMembers: ProjectMember[] = [];
              for (let memberRef of responseObj.project_finished_members) {
                if (memberRef.project_id === project.project_id)
                  currentMembers.push(members[memberRef.member_id]);
              }
              var imageExistsResult = await imageExists(project.image_url)
              arr.push(new Project(
                project.name, 
                project.description, 
                project.link, 
                imageExistsResult ? project.image_url : "", 
                project.finished_year, 
                currentMembers
              ));
            }

            for (let project of responseObj.projects) {
              var imageExistsResult = await imageExists(project.image_url)
              arr.push(new Project(
                project.title, 
                project.description, 
                project.link, 
                imageExistsResult ? project.image_url : "", 
                project.finished_year, 
                []
              ));
            }

            observer.next(arr);
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      }
      
      return () => {
        xhr.abort();
      };
    });
  }

  // Depreciated
  getOldProjects(): Observable<Project[]> { 
    return new Observable(function (observer) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "https://sorrer.dev/test.php?link", true);
      xhr.send();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(xhr.responseText, "text/html");
            var arr: Project[] = [];
            for (let i = 0; i < doc.body.children.length; i++) {
              if (doc.body.children[i].tagName == "DIV") {
                var title = unescapeHTML(doc.body.children[i].getElementsByTagName("channeltitle")[0].innerHTML);
                var description = unescapeHTML(doc.body.children[i].getElementsByTagName("channelinfo")[0].innerHTML);
                arr.push(new Project(title, description));
              }
            }
            observer.next(arr);
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }

        function unescapeHTML(escapedHTML: string) {
          return escapedHTML.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
        }
      }

      return () => {
        xhr.abort();
      };
    });
  }
}
