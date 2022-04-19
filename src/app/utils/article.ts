import { ProjectMember } from "./project";

export class Article {
  constructor(
    public title: string = "",
    public description: string = "",
    public date: string = "",
    public imageUrl: string = "",
    public authors: string[] = [],
  ) {
  }

  toString(): string {
    return `[${this.title}, ${this.description}, ${this.authors}, ${this.date}]`;
  }
}