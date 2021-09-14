import {UiLockerStoreFacade} from '@@ui-locker/store/ui-locker-store.facade';
import {Component} from '@angular/core';

@Component({
  selector: 'app-full-screen-locker',
  template: `
    <div class="fullscreen-block" *ngIf="locked">
      <div class="cs-loader">
        <div class="cs-loader-inner">
          <label> &#9679;</label>
          <label> &#9679;</label>
          <label> &#9679;</label>
          <label> &#9679;</label>
          <label> &#9679;</label>
          <label> &#9679;</label>
        </div>
      </div>
    </div>
  `
})
export class FullScreenLockerComponent {

  public locked: boolean;

  constructor(private uiLockerStoreFacade: UiLockerStoreFacade) {
    const onKeyDownHandler = (event: KeyboardEvent) => {
      event.preventDefault();
    };
    this.locked = false;
    uiLockerStoreFacade.locked$.subscribe((locked: boolean) => {
      if (locked) {
        document.addEventListener('keydown', onKeyDownHandler);
      } else {
        document.removeEventListener('keydown', onKeyDownHandler);
      }
      this.locked = locked;
    });
  }
}
