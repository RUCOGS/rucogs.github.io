
import { Injectable } from '@angular/core';
import { PageLink } from "@utils/pagelink";

// Settings for the entire site.
// Edit these if you need to make minor tweaks

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public General = new class {
    // Currently available pages on the navigation menus
    
    //  Note that removing a link does not mean the page is gone -- it only means
    //  you won't see it on the navigational menu. You can still access the page
    //  using it's URL.

    //  Format: new PageLink("Link Name", "url_relative_to_the_site");
    public pageLinks: PageLink[] = [
      new PageLink("Home", "home"),
      new PageLink("Calendar", "calendar"),
      new PageLink("Projects", "projects"),
      new PageLink("Pictures", "pictures"),
      new PageLink("Resources", "resources"),
      // new PageLink("SGJ", "scarlet-game-jam"),
      new PageLink("Blog", "blog"),
      new PageLink("Login", "login")
    ];

    // Social media links
    public instagramLink: string = "https://www.instagram.com/rutgerscogs/";
    public twitterLink: string = "https://twitter.com/RutgersCOGS";
    public discordLink: string = "https://discord.gg/aQUgesr";
    public mailingListLink: string = "http://eepurl.com/cgDAk5";
  }
  
  // Scarlet Game Jam
  // See src\app\pages\scarlet-game-jam\scarlet-game-jam.component.ts

  // Footer Social Media Buttons
  // See src\app\components\footer-social-media-buttons\footer-social-media-buttons.component.html
}