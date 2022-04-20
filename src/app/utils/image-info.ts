export class ImageInfo {
  public filePath: string;
  public description: string;
  public tags: string[];

  public constructor(filePath: string, description: string = "", tags: string[] = []) {
    this.filePath = filePath;
    this.description = description;
    this.tags = tags;
  }
}
