import { Project } from "./project";
import { UserSocial } from "./user-social";

export type User = {
  id: string;
  username?: string;
  displayName: string;
  email?: string;
  avatarLink?: string;
  bannerLink?: string;
  socialLinks?: UserSocial[];
  projects?: Project[];
  createdAt?: Date;
}
