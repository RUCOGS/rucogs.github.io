export class FileUtils {
  static ReadAsBase64(file): Promise<any> {
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

  static Base64ToByteSize(base64: string) {
    // We want to remove the '=' padding characters to get the true length
    return 4 * base64.replace('=', '').length / 3; 
  }

  static ByteToKB(bytes: number) {
    return bytes / 1000;
  }
  
  static ByteToMB(bytes: number) {
    return this.ByteToKB(bytes) / 1000;
  }
}