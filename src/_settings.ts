import { Injectable, isDevMode } from '@angular/core';
import form from '@iconify/icons-ant-design/form-outlined';
import mail from '@iconify/icons-ant-design/mail-filled';
import play from '@iconify/icons-ant-design/play-circle-filled';
import arrowDownCircleFill from '@iconify/icons-bi/arrow-down-circle-fill';
import chevronUp from '@iconify/icons-bx/chevron-up';
import link from '@iconify/icons-bx/link';
import video from '@iconify/icons-dashicons/format-video';
import arrowExportRight from '@iconify/icons-fluent/arrow-export-ltr-16-filled';
import arrowExportLeft from '@iconify/icons-fluent/arrow-export-rtl-16-filled';
import arrowLeft from '@iconify/icons-fluent/arrow-left-16-filled';
import arrowRight from '@iconify/icons-fluent/arrow-right-16-filled';
import article from '@iconify/icons-ic/outline-article';
import tutorial from '@iconify/icons-ic/outline-integration-instructions';
import appStore from '@iconify/icons-simple-icons/appstore';
import blender from '@iconify/icons-simple-icons/blender';
import discord from '@iconify/icons-simple-icons/discord';
import github from '@iconify/icons-simple-icons/github';
import google from '@iconify/icons-simple-icons/google';
import googlePlay from '@iconify/icons-simple-icons/googleplay';
import html5 from '@iconify/icons-simple-icons/html5';
import instagram from '@iconify/icons-simple-icons/instagram';
import itchdotio from '@iconify/icons-simple-icons/itchdotio';
import linkedIn from '@iconify/icons-simple-icons/linkedin';
import pixiv from '@iconify/icons-simple-icons/pixiv';
import soundCloud from '@iconify/icons-simple-icons/soundcloud';
import spotify from '@iconify/icons-simple-icons/spotify';
import steam from '@iconify/icons-simple-icons/steam';
import twitch from '@iconify/icons-simple-icons/twitch';
import twitter from '@iconify/icons-simple-icons/twitter';
import unity from '@iconify/icons-simple-icons/unity';
import unrealEngine from '@iconify/icons-simple-icons/unrealengine';
import youtube from '@iconify/icons-simple-icons/youtube';
import { PageLink } from '@src/app/classes/pagelink';

// Settings for the entire site.
// Edit these if you need to make minor tweaks

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public General = new (class {
    // Currently available pages on the navigation menus

    //  Note that removing a link does not mean the page is gone -- it only means
    //  you won't see it on the navigational menu. You can still access the page
    //  using it's URL.

    //  Format: new PageLink("Link Name", "url_relative_to_the_site");
    public pageLinks: PageLink[] = [
      new PageLink('Home', 'home'),
      new PageLink('SGJ', 'scarlet-game-jam'),
      // new PageLink('GGJ', 'global-game-jam'),
      new PageLink('Members', 'members'),
      new PageLink('Projects', 'projects'),
      new PageLink('Pics', 'pictures'),
      new PageLink('Calendar', 'calendar'),
      new PageLink('Resources', 'resources'),
      new PageLink('Blog', 'blog'),
      // new PageLink('Merch', 'https://scarlet-game-jam.allcolorsllc.com/'),
    ];

    // Social media links
    public instagramLink: string = 'https://www.instagram.com/rutgerscogs/';
    public twitterLink: string = 'https://twitter.com/RutgersCOGS';
    public discordLink: string = 'https://discord.gg/aQUgesr';
    public mailingListLink: string = 'http://eepurl.com/cgDAk5';

    public icons = {
      play,
      discord,
      twitter,
      github,
      soundCloud,
      appStore,
      googlePlay,
      itchdotio,
      pixiv,
      twitch,
      instagram,
      youtube,
      steam,
      spotify,
      unity,
      unrealEngine,
      blender,
      html5,
      link,
      mail,
      arrowExportRight,
      arrowRight,
      arrowExportLeft,
      arrowLeft,
      chevronUp,
      arrowDownCircleFill,
      article,
      video,
      tutorial,
      google,
      form,
      linkedIn,
    };

    defaultAvatarSrc: string =
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
    defaultCardImageSrc: string =
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  })();

  public Backend = new (class {
    public backendDomain = isDevMode() ? 'localhost:3000' : 'atlinx.net';
    public backendRelativeBaseUrl = isDevMode() ? '' : '/rucogs/backend';
    public graphQLRelativePath = '/graphql';

    // Dev mode is unsecure
    public httpsPrefix = isDevMode() ? 'http://' : 'https://';
    public wssPrefix = isDevMode() ? 'ws://' : 'wss://';

    public get backendDomainPlusBaseUrl() {
      return this.backendDomain + this.backendRelativeBaseUrl;
    }

    public get backendHttpsURL() {
      return this.httpsPrefix + this.backendDomainPlusBaseUrl;
    }

    public get graphQLHttpsURL() {
      return this.httpsPrefix + this.backendDomainPlusBaseUrl + this.graphQLRelativePath;
    }

    public get graphQLWssURL() {
      return this.wssPrefix + this.backendDomainPlusBaseUrl + this.graphQLRelativePath;
    }

    public selfHostedPrefix = 'cdn://';
    public cdnRelativePath: string = '/cdn';
  })();

  // Scarlet Game Jam
  // See src\app\pages\scarlet-game-jam\scarlet-game-jam.component.ts
}
