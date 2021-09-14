export class CollectionUtils {

  static isEmpty(arr: any): boolean {
    return arr ? !arr.length : true;
  }

  static isNotEmpty(value: any): boolean {
    return !CollectionUtils.isEmpty(value);
  }
}
