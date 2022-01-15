import { Project } from "./project";
import { SocialLink } from "./social-link";

export class User {
  constructor(
    public username: string,
    public displayName: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password?: string,
    public discordId?: string,
    public googleId?: string,
    public socialLinks: SocialLink[] = [],
    public projects: Project[] = []
  ) {}
}
