export class CollectionUtils {

  static isEmpty(arr: any): boolean {
    return arr ? Boolean(arr.length) : false;
  }

  static isNotEmpty(value: any): boolean {
    return !CollectionUtils.isEmpty(value);
  }
}
