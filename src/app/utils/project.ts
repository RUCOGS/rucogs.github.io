export class Project {
  constructor(
    public title: string = "",
    public description: string = "",
    public url: string = "",
    public imageUrl: string = "",
    public year: string = "",
    public members: ProjectMember[] = [],
  ) {
    if (year == "")
      this.year = "2021";
    if (imageUrl == "")
      this.imageUrl = "assets/images/default-project-image.png";
  }

  toString(): string {
    return `[${this.title}, ${this.description}]`;
  }
}

export interface ProjectMember {
  member_id: number;
  fullname: string;
  description: string;
  twitter: string;
  instagram: string;
  soundcloud: string;
  youtube: string;
}