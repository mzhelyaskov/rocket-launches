import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {LaunchesStateModel} from '@@shared/models/launches-state-model';
import {SetLaunchPageData} from '@@app/store/launches.actions';
import {LaunchesPageData} from '@@shared/models/launches-page-data';

export const LAUNCHES_ROOT_KEY = 'launches';
export const LAUNCHES_STATE_TOKEN = new StateToken<LaunchesStateModel>(LAUNCHES_ROOT_KEY);

const initialState: LaunchesStateModel = {
  launchesPageNumber: 0,
  launchesSearchCriteria: null,
  launchesPage: null
};

@State<LaunchesStateModel>({
  name: LAUNCHES_STATE_TOKEN,
  defaults: {...initialState}
})
@Injectable()
export class LaunchesState {

  @Selector()
  static launchesPageData(state: LaunchesStateModel): LaunchesPageData {
    return state.launchesPage;
  }

  @Selector()
  static launchesPageNumber(state: LaunchesStateModel): number {
    return state.launchesPageNumber;
  }

  @Action(SetLaunchPageData)
  activateStep(ctx: StateContext<LaunchesStateModel>, action: SetLaunchPageData) {
    ctx.patchState({launchesPage: action.pageData});
  }
}
