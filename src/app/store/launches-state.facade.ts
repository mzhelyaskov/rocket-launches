import {Injectable} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {LAUNCHES_STATE_TOKEN, LaunchesState} from '@@app/store/launches.state';
import {LaunchesStateModel} from '@@shared/models/launches-state-model';
import {
  AddLaunchLocations,
  SetLastLoadedLaunchLocationPage,
  SetLaunchPageData,
  UpdateLaunchesPageCriteriaParams
} from '@@app/store/launches.actions';
import {LaunchesPage} from '@@shared/models/launches-page';
import {LaunchLocation} from '@@shared/models/launch-location';
import {LaunchesPageCriteria} from '@@shared/models/launches-page-criteria';
import {LaunchLocationsPage} from '@@shared/models/launch-locations-page';

@Injectable({providedIn: 'root'})
export class LaunchesStateFacade {

  @Select(LAUNCHES_STATE_TOKEN) public state$: Observable<LaunchesStateModel>;
  @Select(LaunchesState.launchLocations) public launchLocations$: Observable<LaunchLocation[]>;

  constructor(private store: Store) {}

  get state(): LaunchesStateModel {
    return this.store.selectSnapshot(LAUNCHES_STATE_TOKEN);
  }

  setLaunches$(pageData: LaunchesPage): Observable<any> {
    return this.store.dispatch(new SetLaunchPageData(pageData));
  }

  addLaunchLocations$(launchLocations: LaunchLocation[]): Observable<any> {
    return this.store.dispatch(new AddLaunchLocations(launchLocations));
  }

  setLastLoadedLaunchLocationPage$(page: LaunchLocationsPage): Observable<any> {
    return this.store.dispatch(new SetLastLoadedLaunchLocationPage(page));
  }

  updateLaunchesPageCriteriaParams$(criteria: LaunchesPageCriteria): Observable<any> {
    return this.store.dispatch(new UpdateLaunchesPageCriteriaParams(criteria));
  }

  getLaunchesPageCriteria(): LaunchesPageCriteria {
    return this.state.launchesPageCriteria;
  }

  getLastLaunchesLocationsPage(): LaunchLocationsPage {
    return this.state.lastLoadedLocationPage;
  }
}
