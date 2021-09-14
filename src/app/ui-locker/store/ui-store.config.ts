import {UiLockerStateModel} from '@@ui-locker/models/ui-locker-state-model';
import {StateToken} from '@ngxs/store';

export const UI_LOCKER_ROOT_KEY = 'uiLocker';
export const UI_LOCKER_STATE_TOKEN = new StateToken<UiLockerStateModel>(UI_LOCKER_ROOT_KEY);
