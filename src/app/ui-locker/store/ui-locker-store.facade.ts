import {UiLockerStateModel} from '@@ui-locker/models/ui-locker-state-model';
import {DecrementPendingRequests, IncrementPendingRequests, UnlockUi} from '@@ui-locker/store/ui-locker.action';
import {UiLockerState} from '@@ui-locker/store/ui-locker.state';
import {Injectable} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UiLockerStoreFacade {

  @Select(UiLockerState) uiLocker$: Observable<UiLockerStateModel>;
  @Select(UiLockerState.isLocked) locked$: Observable<boolean>;

  constructor(private store: Store) {}

  unlockAll() {
    this.store.dispatch(new UnlockUi());
  }

  incrementPendingRequests() {
    this.store.dispatch(new IncrementPendingRequests());
  }

  decrementPendingRequests() {
    this.store.dispatch(new DecrementPendingRequests());
  }
}
