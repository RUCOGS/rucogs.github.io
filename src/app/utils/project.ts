export class Project {
  constructor(
    public title: string,
    public description: string
  ) {}

  toString(): string {
    return `[${this.title}, ${this.description}]`;
  }
}