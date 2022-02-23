import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FilterHeaderComponent } from '@app/components/filter-header/filter-header.component';
import { ProjectManagerService } from '@app/services/project-manager.service';
import { Project } from '@app/utils/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  host: {
    class: 'page'
  }
})
export class ProjectsComponent implements OnInit, AfterViewInit {

  @ViewChild(FilterHeaderComponent) filterHeader: FilterHeaderComponent | undefined;
  @ViewChild('sectionsContainer') sectionsContainer: ElementRef | undefined;

  projects: Project[] = [];
  sortedSections: SortedSection[] = [];
  
  constructor(private projectManager: ProjectManagerService) { }

  ngOnInit(): void {
    this.projectManager.getProjects().subscribe((x) => {
      this.projects = x;
      this.updateSortedSections();
    });
  }

  ngAfterViewInit(): void {
    if (!this.filterHeader)
      return;
    
    // NOTE: This is really inefficient because we are regenerating the entire sortedSections array
    //       whenever the user changes a filter option. We should consider only modifying parts of
    //       of the sorted array that are needed (ie. only reversing the sortedSections if sortAscending 
    //       changes).
    this.filterHeader.newSearchRequest.subscribe(this.onNewSearchRequest.bind(this));
    this.filterHeader.sortingModeChange.subscribe(this.updateSortedSections.bind(this));
    this.filterHeader.sortAscendingChange.subscribe(this.updateSortedSections.bind(this));
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.standardizeSectionCardGrids();
  }

  standardizeSectionCardGrids() {
    if (!this.sectionsContainer)
      return;
    
    console.log(this.sectionsContainer.nativeElement.querySelectorAll("app-card-grid"));

    for (let grid of this.sectionsContainer.nativeElement.querySelectorAll("app-card-grid")) {
      grid.style.gridTemplateColumns = `repeat(auto-fit, 1fr)`;
    }
    
    // determiningGrid is always the grid with the most elements (project-items) in it.
    let determiningGrid: any = undefined;
    for (let grid of this.sectionsContainer.nativeElement.querySelectorAll("app-card-grid")) {
      if (determiningGrid === undefined || (grid.childElementCount >= determiningGrid.childElementCount))
        determiningGrid = grid;
    }
    console.log("min width: " + determiningGrid);
    for (let grid of this.sectionsContainer.nativeElement.querySelectorAll("app-card-grid")) {
      if (grid !== determiningGrid)
        grid.style.gridTemplateColumns = `repeat(auto-fit, ${determiningGrid.children[0].clientWidth - 0.5}px)`;
    }

    this.sectionsContainer.nativeElement.style.visibility = 'visible';
  }

  updateSortedSections() {
    if (this.sectionsContainer)
      this.sectionsContainer.nativeElement.style.visibility = 'hidden';
    this.sortedSections = this.getSortedSections();

    // Runs a tick after sorted sections are updated in order to let the auto-fit css take over.
    // We can probably make a clean solution if we write our own column auto-fit system from the
    // ground up, but that's too complicated. So for now, we're relying on css auto-fit to handle 
    // it all for us. 
    setTimeout(this.standardizeSectionCardGrids.bind(this), 0);
  }

  getSortedSections(): SortedSection[] {
    if (this.filterHeader === undefined)
      return [];
    
    let newSortedSections: SortedSection[];
    switch(this.filterHeader.sortingMode) {
      case "none": {
        newSortedSections = [new SortedSection("Projects", this.projects)];
        break;
      }
      case "year": {
        newSortedSections = this.getSortedSectionsFromProjects<number>(this.projects, 
          (a: Project) => {
            return a.year;
          },
          (a: Project) => {
            return a.year.toString();
          },
          (a: number, b: number) => {
            return b - a;
          }
        );
        break;
      }
      
      // NOTE: No sorting by author now because it feels wrong to
      //       show the same project twice in the projects sscreen
      //       if more than one person worked on it.
      //      
      // TODO: Make a dedicated page for browsing user profiles.
      
      // case "author": {
      //   newSortedSections = this.getSortedSectionsFromProjects<string>(this.projects, 
      //     (a: Project) => {
      //       return [a.members.map(x => x.fullname)];
      //     },
      //     (a: string, b: string) => {
      //       return a.localeCompare(b);
      //   });
      //   break;
      // }

      case "completion": {
        newSortedSections = this.getSortedSectionsFromProjects<boolean>(this.projects, 
          (a: Project) => {
            return a.completed;
          },
          (a: Project) => {
            return a.completed ? "Completed" : "Work in Progress";
          },
          (a: boolean, b: boolean) => {
            // Always shows complete projects first
            return a ? -1 : 1;
          }
        );
        break;
      }
      default: {
        newSortedSections = [];
      }
    }
    if (!this.filterHeader.sortAscending)
      newSortedSections.reverse();
    return newSortedSections;
  }

  getSortedSectionsFromProjects<TComparable>(
    projects: Project[], 
    getComparableFn: (a: Project) => TComparable,
    getSectionDisplayNameFn: (a: Project) => string,
    comparatorFn: (a: TComparable, b: TComparable) => number
    ): SortedSection[] {
    let newSortedSectionsMap: Map<TComparable, SortedSection> = new Map();
    for (let project of projects) {
      
      // WARN: This implementation does support custom equality comparison for TComparable keys.
      //       This means only primitives can realistically be used as TComparable keys, because 
      //       they are not compared by reference but by value instead. 
      
      if (newSortedSectionsMap.has(getComparableFn(project)))
        newSortedSectionsMap.get(getComparableFn(project))?.projects.push(project);
      else
        newSortedSectionsMap.set(getComparableFn(project), new SortedSection(getSectionDisplayNameFn(project), [project]));
    }
    let sortedKeyValuePairs: KeyValuePair<TComparable, SortedSection>[] = []; 
    newSortedSectionsMap.forEach((value, key, map) => {
      sortedKeyValuePairs.push(new KeyValuePair(key, value));
    });

    // We sort by the keys.
    sortedKeyValuePairs.sort((a, b) => {
      return comparatorFn(a.key, b.key);
    });

    // We then return the values, which are now sorted based on the keys.
    return sortedKeyValuePairs.map(pair => pair.value);
  }

  onNewSearchRequest(searchText: string) {
    if (this.filterHeader === undefined)
      return;
    
    // We update the sorted sections
    this.updateSortedSections();

    if (searchText === "")
      return;

    // We filter out the projects in each section such that
    // all the projects contain the searched up text.
    let finalSortedSections: SortedSection[] = [];
    for (let section of this.sortedSections) {
      let projectsWithRankings: ProjectWithRanking[] = [];
      for (let project of section.projects) {
        const projectSearchRanking = this.getProjectText(project).indexOf(searchText);
        console.log("Project text: " + this.getProjectText(project) + " searching for: " + searchText + " index: " + projectSearchRanking);
        if (projectSearchRanking >= 0)
          projectsWithRankings.push(new ProjectWithRanking(project, projectSearchRanking));
      }
      projectsWithRankings.sort((a: ProjectWithRanking, b: ProjectWithRanking) => {
        return b.ranking - a.ranking;
      });
      section.projects = projectsWithRankings.map(x => x.project);
      if (section.projects.length > 0)
        finalSortedSections.push(section);
    }
    this.sortedSections = finalSortedSections;
  }

  getProjectSearchRanking(project: Project, searchText: string) {
    return this.getProjectText(project).indexOf(searchText);
  }

  // Text representation of a project.
  // We will use this text for searching.
  getProjectText(project: Project): string {
    return (project.title + " " + project.description + " " + project.members.map((member) => member.fullname).join(" ")).toLowerCase();
  }
}

class KeyValuePair<K, V> {
  constructor(public key: K, public value: V) {}
}

class ProjectWithRanking {
  constructor(public project: Project, public ranking: number) {}
}

class SortedSection {
  constructor(public name: string, public projects: Project[]) {}
}
