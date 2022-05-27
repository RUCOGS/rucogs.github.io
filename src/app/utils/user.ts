import { Project } from "./project";
import { SocialLink } from "./social-link";

export type User = {
  username?: string;
  displayName: string;
  email?: string;
  avatarLink?: string;
  bannerLink?: string;
  socialLinks?: SocialLink[];
  projects?: Project[];
}
