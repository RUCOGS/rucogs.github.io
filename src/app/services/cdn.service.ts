import { Injectable } from '@angular/core';
import { SettingsService } from '@src/_settings';

@Injectable({
  providedIn: 'root'
})
export class CdnService {
  constructor(private settings: SettingsService) { }
  
  isSelfHostedFile(selfHostedFilePath: string) {
    return selfHostedFilePath.startsWith(this.settings.Backend.selfHostedPrefix) && selfHostedFilePath.length > this.settings.Backend.selfHostedPrefix.length;
  }
  
  selfHostedToRelativeFilePath(selfHostedFilePath: string) {
    if (!this.isSelfHostedFile(selfHostedFilePath))
      throw new Error("Cannot get self hosted filepath from filepath that isn't self hosted.");
    // Trim `self://` from the start
    return selfHostedFilePath.substring(this.settings.Backend.selfHostedPrefix.length);
  }

  // Fetchs the link to a file. If it's self hosted, the
  // self hosted URL is converted into an actual link.
  getFileLink(filePath: string) {
    if (this.isSelfHostedFile(filePath)) {
      return this.getSelfHostedFileLink(filePath);
    }
    return filePath;
  }

  getSelfHostedFileLink(selfHostedFilePath: string) {
    const relativePath = this.selfHostedToRelativeFilePath(selfHostedFilePath);
    return this.settings.Backend.backendApiLink + this.settings.Backend.cdnRelativePath + "/" + relativePath;
  }
}
