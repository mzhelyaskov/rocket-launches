import * as memoizee from 'memoizee';

export function Memoize(options?: memoizee.Options<(...args: any[]) => any>) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const oldFunction = descriptor.value;
    const memoizedFn = memoizee(oldFunction, options);
    descriptor.value = function () {
      return memoizedFn.apply(this, arguments);
    };
  };
}
