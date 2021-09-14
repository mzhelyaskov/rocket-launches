import {Injectable} from '@angular/core';
import {LaunchesRestService} from '@@app/rest/launches-rest.service';
import {Observable} from 'rxjs';
import {exhaustMap, mapTo} from 'rxjs/operators';
import {LaunchesStateFacade} from '@@app/store/launches-state.facade';
import {LaunchesPage} from '@@shared/models/launches-page';
import {LaunchesPageCriteria} from '@@shared/models/launches-page-criteria';
import {LaunchLocationsPage} from '@@shared/models/launch-locations-page';
import {UiLocking} from '@@ui-locker/decorators/ui-locker.decorator';

@Injectable({providedIn: 'root'})
export class LaunchesInfoService {

  constructor(private launchesRestService: LaunchesRestService,
              private launchesStateFacade: LaunchesStateFacade) {
  }

  @UiLocking()
  fetchUpcomingLaunchesPage$(): Observable<LaunchesPage> {
    const criteria: LaunchesPageCriteria = this.launchesStateFacade.getLaunchesPageCriteria();
    return this.launchesRestService.upcomingLaunchesPage$(criteria).pipe(
      exhaustMap((pd: LaunchesPage) => this.launchesStateFacade.setLaunches$(pd).pipe(mapTo(pd)))
    )
  }

  @UiLocking()
  fetchLaunchLocationPage$(url: string): Observable<LaunchLocationsPage> {
    return this.launchesRestService.getNextLaunchLocationsPage$(url).pipe(
      exhaustMap((page: LaunchLocationsPage) => {
        this.launchesStateFacade.setLastLoadedLaunchLocationPage$(page);
        return this.launchesStateFacade.addLaunchLocations$(page.results).pipe(mapTo(page));
      })
    );
  }
}

