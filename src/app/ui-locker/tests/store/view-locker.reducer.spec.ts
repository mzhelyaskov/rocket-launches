import {UiLockerStateModel} from '@@ui-locker/models/ui-locker-state-model';
import {DecrementPendingRequests, IncrementPendingRequests} from '@@ui-locker/store/ui-locker.action';
import {initialState, UI_LOCKER_STATE_TOKEN, UiLockerState} from '@@ui-locker/store/ui-locker.state';
import {TestBed} from '@angular/core/testing';
import {NgxsModule, Store} from '@ngxs/store';

describe('UiLocker', () => {

  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([UiLockerState])]
    });
    store = TestBed.inject(Store);
  });

  it('should return the initial state', () => {
    expect(store.selectSnapshot(UI_LOCKER_STATE_TOKEN)).toEqual(initialState);
  });

  it('should increase pending request count', () => {
    store.dispatch(new IncrementPendingRequests());
    const state: UiLockerStateModel = store.selectSnapshot(UI_LOCKER_STATE_TOKEN);
    expect(state.pendingRequestsCount).toBe(1);
    expect(state.locked).toBe(true);
  });

  it('should increase and decrease pending request count', () => {
    store.dispatch(new DecrementPendingRequests());
    const state: UiLockerStateModel = store.selectSnapshot(UI_LOCKER_STATE_TOKEN);
    expect(state.pendingRequestsCount).toBe(0);
    expect(state.locked).toBe(false);
  });

  it('should not decrease pending request count below 0', () => {
    store.dispatch(new IncrementPendingRequests());
    store.dispatch(new DecrementPendingRequests());
    store.dispatch(new IncrementPendingRequests());
    store.dispatch(new IncrementPendingRequests());
    store.dispatch(new DecrementPendingRequests());
    store.dispatch(new DecrementPendingRequests());
    const state: UiLockerStateModel = store.selectSnapshot(UI_LOCKER_STATE_TOKEN);
    expect(state.pendingRequestsCount).toBe(0);
    expect(state.locked).toBe(false);
  });

  it('should lock screen when pending requests count more then 0', () => {
    store.dispatch(new IncrementPendingRequests());
    const state: UiLockerStateModel = store.selectSnapshot(UI_LOCKER_STATE_TOKEN);
    expect(state.pendingRequestsCount).toBe(1);
    expect(state.locked).toBe(true);
  });
});
