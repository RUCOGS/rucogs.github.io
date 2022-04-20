import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { Project } from '@app/utils/project';
import { User } from '@app/utils/user';
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
            
            // TODO: Parse project using new system

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
