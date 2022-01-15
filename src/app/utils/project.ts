import { User } from './user';

// TODO: Replace projectmember with User class
export class Project {
  constructor(
    public title: string,
    public description: string,
    public url: string,
    public imageUrl: string,
    public creationDate: Date,
    public members: User[],
    public completed: boolean,
  ) {
    if (imageUrl == "")
      this.imageUrl = "assets/images/default-project-image.png";
  }

  toString(): string {
    return `[${this.title}, ${this.description}]`;
  }
}