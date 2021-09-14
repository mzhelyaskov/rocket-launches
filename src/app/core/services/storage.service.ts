import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class StorageService {

  constructor(private window: Window) {}

  get(key: string): string {
    return this.window.localStorage.getItem(key);
  }

  set(key: string, value: string) {
    return this.window.localStorage.setItem(key, value);
  }
}
