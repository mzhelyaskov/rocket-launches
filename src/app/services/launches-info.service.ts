import {Injectable} from '@angular/core';
import {LaunchesRestService} from '@@app/rest/launches-rest.service';
import {EMPTY, Observable} from 'rxjs';
import {delay, exhaustMap, mapTo} from 'rxjs/operators';
import {LaunchesStateFacade} from '@@app/store/launches-state.facade';
import {LaunchesPage} from '@@shared/models/launches-page';
import {LaunchesPageCriteria} from '@@shared/models/launches-page-criteria';
import {LaunchLocationsPage} from '@@shared/models/launch-locations-page';
import {ApiUrlConfig} from '@@app/config/api-url.config';

@Injectable({providedIn: 'root'})
export class LaunchesInfoService {

  constructor(private launchesRestService: LaunchesRestService,
              private launchesStateFacade: LaunchesStateFacade) {
  }

  fetchUpcomingLaunchesPage$(): Observable<LaunchesPage> {
    const criteria: LaunchesPageCriteria = this.launchesStateFacade.getLaunchesPageCriteria();
    return this.launchesRestService.upcomingLaunchesPage$(criteria).pipe(
      exhaustMap((pd: LaunchesPage) => this.launchesStateFacade.setLaunches$(pd).pipe(mapTo(pd)))
    )
  }

  fetchNextLaunchLocationPage$(): Observable<LaunchLocationsPage> {
    const page: LaunchLocationsPage = this.launchesStateFacade.getLastLaunchesLocationsPage();
    let url = ApiUrlConfig.LAUNCH_LOCATIONS_INITIAL_URL;
    if (page && page.next) {
      url = page.next;
    }
    console.log('fetch:', url);
    return this.launchesRestService.getNextLaunchLocationsPage$(url).pipe(
      exhaustMap((page: LaunchLocationsPage) => {
        this.launchesStateFacade.setLastLoadedLaunchLocationPage$(page);
        return this.launchesStateFacade.addLaunchLocations$(page.results).pipe(mapTo(page), delay(6000));
      })
    );
  }
}

