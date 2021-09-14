import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {LaunchesStateModel} from '@@shared/models/launches-state-model';
import {
  AddLaunchLocations,
  SetLastLoadedLaunchLocationPage,
  SetLaunchPageData,
  UpdateLaunchesPageCriteriaParams
} from '@@app/store/launches.actions';
import {LaunchesPage} from '@@shared/models/launches-page';
import {LaunchLocation} from '@@shared/models/launch-location';

export const LAUNCHES_ROOT_KEY = 'launches';
export const LAUNCHES_STATE_TOKEN = new StateToken<LaunchesStateModel>(LAUNCHES_ROOT_KEY);

const initialState: LaunchesStateModel = {
  lastLoadedLocationPage: null,
  launchesPageCriteria: {
    offset: 0,
    limit: 10,
    ordering: 'window_start'
  },
  locations: [],
  launchesPage: null
};

@State<LaunchesStateModel>({
  name: LAUNCHES_STATE_TOKEN,
  defaults: {...initialState}
})
@Injectable()
export class LaunchesState {

  @Selector()
  static launchesPage(state: LaunchesStateModel): LaunchesPage {
    return state.launchesPage;
  }

  @Selector()
  static launchLocations(state: LaunchesStateModel): LaunchLocation[] {
    return state.locations;
  }

  @Action(SetLaunchPageData)
  setLaunchesPageData(ctx: StateContext<LaunchesStateModel>, action: SetLaunchPageData) {
    ctx.patchState({launchesPage: action.pageData});
  }

  @Action(SetLastLoadedLaunchLocationPage)
  setLastLoadedLaunchLocationPage(ctx: StateContext<LaunchesStateModel>, action: SetLastLoadedLaunchLocationPage) {
    ctx.patchState({lastLoadedLocationPage: action.page});
  }

  @Action(AddLaunchLocations)
  addLaunchLocations(ctx: StateContext<LaunchesStateModel>, action: AddLaunchLocations) {
    const state: LaunchesStateModel = ctx.getState();
    ctx.patchState({locations: [...state.locations, ...action.launchLocations]});
  }

  @Action(UpdateLaunchesPageCriteriaParams)
  updateLaunchesPageCriteriaParams(ctx: StateContext<LaunchesStateModel>, action: UpdateLaunchesPageCriteriaParams) {
    const state: LaunchesStateModel = ctx.getState();
    ctx.patchState({launchesPageCriteria: {...(state.launchesPageCriteria || {}), ...action.pageCriteria}});
  }
}
