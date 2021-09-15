export class CollectionUtils {

  static getFirstItem(arr: any[]): any {
    return arr && arr.length ? arr[0] : null;
  }

  static getLastItem(arr: any[]): any {
    return arr && arr.length ? arr[arr.length - 1] : null;
  }

  static isNotEmpty(arr: any[]): boolean {
    return arr && Boolean(arr.length);
  }
}
