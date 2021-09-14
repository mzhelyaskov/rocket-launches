import {UiLockerStateModel} from '@@ui-locker/models/ui-locker-state-model';
import {DecrementPendingRequests, IncrementPendingRequests, UnlockUi} from '@@ui-locker/store/ui-locker.action';
import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';

export const UI_LOCKER_ROOT_KEY = 'uiLocker';
export const UI_LOCKER_STATE_TOKEN = new StateToken<UiLockerStateModel>(UI_LOCKER_ROOT_KEY);

export const initialState: UiLockerStateModel = {
  pendingRequestsCount: 0,
  locked: false
};

@State<UiLockerStateModel>({
  name: UI_LOCKER_STATE_TOKEN,
  defaults: {...initialState}
})
@Injectable()
export class UiLockerState {

  @Selector()
  static isLocked(state: UiLockerStateModel) {
    return state.locked;
  }

  @Action(IncrementPendingRequests)
  incrementPendingRequests(ctx: StateContext<UiLockerStateModel>) {
    const state = ctx.getState();
    const pendingRequestsCount = state.pendingRequestsCount + 1;
    ctx.patchState({pendingRequestsCount, locked: true});
  }

  @Action(DecrementPendingRequests)
  decrementPendingRequests(ctx: StateContext<UiLockerStateModel>) {
    const state = ctx.getState();
    const pendingRequestsCount = Math.max(0, state.pendingRequestsCount - 1);
    ctx.patchState({pendingRequestsCount, locked: pendingRequestsCount > 0});
  }

  @Action(UnlockUi)
  unlockUi(ctx: StateContext<UiLockerStateModel>) {
    ctx.setState({...initialState});
  }
}
