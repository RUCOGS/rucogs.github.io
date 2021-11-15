import { Injectable } from '@angular/core';
import { Project } from '@app/utils/project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagerService {

  constructor() {}

  getProjects(): Observable<Project[]> { 
    return new Observable(function (observer) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "https://sorrer.dev/test.php?link", true);
      xhr.send();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(xhr.responseText, "text/html");
            var arr = [];
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
