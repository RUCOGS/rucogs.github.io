export class UserSocial {
  constructor(
    public platform: string,
    public username: string,
    public link: string,
  ) {}
}

export const SOCIAL_PLATFORMS: { 
  [key: string]: { 
    icon: string 
  }; 
} = {
  youtube: {
    icon: "logos:youtube-icon"
  },
  twitter: {
    icon: "akar-icons:twitter-fill"
  },
  itchio: {
    icon: "simple-icons:itchdotio"
  },
  pixiv: {
    icon: "simple-icons:pixiv"
  },
  instagram: {
    icon: "logos:instagram-icon"
  },
  website: {
    icon: "bx:bx-link"
  },
  github: {
    icon: "logos:github-icon"
  },
  steam: {
    icon: "logos:steam"
  },
  googlePlay: {
    icon: "logos:google-play-icon"
  },
  appleStore: {
    icon: "logos:apple"
  },
  soundCloud: {
    icon: "logos:soundcloud"
  },
  spotify: {
    icon: "logos:spotify-icon"
  },
  twitch: {
    icon: "logos:twitch"
  }
};