import { ProjectMember } from "./project";

export class ArticleInfo {
  constructor(
    public filePath: string,
    public title: string = "",
    public description: string = "",
    public date: string = "",
    public imagePath: string = "",
    public authors: string[] = [],
    public tags: string[]
  ) {
  }

  toString(): string {
    return `[${this.title}, ${this.description}, ${this.authors}, ${this.date}]`;
  }
}