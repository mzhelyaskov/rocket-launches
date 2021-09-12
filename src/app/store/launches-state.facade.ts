import {Injectable} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {LAUNCHES_STATE_TOKEN, LaunchesState} from '@@app/store/launches.state';
import {LaunchesStateModel} from '@@shared/models/launches-state-model';
import {SetLaunchPageData} from '@@app/store/launches.actions';
import {LaunchesPageData} from '@@shared/models/launches-page-data';

@Injectable({providedIn: 'root'})
export class LaunchesStateFacade {

  @Select(LAUNCHES_STATE_TOKEN) public state$: Observable<LaunchesStateModel>;
  @Select(LaunchesState.launchesPageData) public pageData$: Observable<LaunchesPageData>;

  constructor(private store: Store) {}

  get state(): LaunchesStateModel {
    return this.store.selectSnapshot(LAUNCHES_STATE_TOKEN);
  }

  setLaunches$(pageData: LaunchesPageData): Observable<any> {
    return this.store.dispatch(new SetLaunchPageData(pageData));
  }

  getNextPageUrl(): string {
    return this.state.launchesPage.next;
  }

  getPreviousPageUrl(): string {
    return this.state.launchesPage.previous;
  }
}
