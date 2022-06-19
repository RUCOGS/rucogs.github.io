export enum DataSize {
  GB = 1_000_000_000,
  MB = 1_000_000,
  KB = 1_000,
  B = 1
}

export class FileUtils {
  static byteSizeToString(byteSize: number) {
    if (byteSize > DataSize.GB)
      return `${this.byteTo(byteSize, DataSize.GB)} GB`;
    else if (byteSize > DataSize.MB)
      return `${this.byteTo(byteSize, DataSize.MB)} MB`;
    else if (byteSize > DataSize.KB)
      return `${this.byteTo(byteSize, DataSize.KB)} KB`;
    else
      return `byteSize B`;
  }

  static byteStringToBytes(byteString: string) {
    const args = byteString.split(' ');
    let amount = parseFloat(args[0]);
    switch(args[1].toUpperCase()) {
      case "GB":
        amount *= 1_000_000_000;
        break;
      case "MB":
        amount *= 1_000_000;
        break; 
      case "KB":
        amount *= 1_000;
        break;
    }
    return amount;
  }

  static readAsBase64(file): Promise<any> {
    const reader = new FileReader();
    const fileValue = new Promise((resolve, reject) => {
      reader.addEventListener('load', () => {
        const result = reader.result as string;
        if (!result) {
          return reject('Cannot read file as base64.');
        }
        return resolve(result);
      });

      reader.addEventListener('error', event => {
        return reject(event);
      });

      reader.readAsDataURL(file);
    });

    return fileValue;
  }

  static base64ToByteSize(base64: string) {
    // We want to remove the '=' padding characters to get the true length
    return 4 * base64.replace('=', '').length / 3; 
  }

  static byteTo(bytes: number, dataSize: DataSize) {
    return bytes / dataSize; 
  }
}