import {Injectable} from '@angular/core';
import {LaunchesRestService} from '@@app/rest/launches-rest.service';
import {Observable} from 'rxjs';
import {exhaustMap, mapTo} from 'rxjs/operators';
import {LaunchesStateFacade} from '@@app/store/launches-state.facade';
import {LaunchesPageData} from '@@shared/models/launches-page-data';
import {LaunchesSearchCriteria} from '@@shared/models/launches-search-criteria';

@Injectable({providedIn: 'root'})
export class LaunchesInfoService {

  constructor(private launchesRestService: LaunchesRestService,
              private launchesStateFacade: LaunchesStateFacade) {
  }

  fetchNextUpcomingLaunchesPage$(): Observable<LaunchesPageData> {
    const url = this.launchesStateFacade.getNextPageUrl();
    const criteria: LaunchesSearchCriteria = {url};
    return this.getLaunches$(criteria);
  }

  fetchFirstUpcomingLaunchesPage$(): Observable<LaunchesPageData> {
    return this.getLaunches$();
  }

  fetchPrevUpcomingLaunchesPage$(): Observable<LaunchesPageData> {
    const url = this.launchesStateFacade.getPreviousPageUrl();
    const criteria: LaunchesSearchCriteria = {url};
    return this.getLaunches$(criteria);
  }

  private getLaunches$(criteria?: LaunchesSearchCriteria): Observable<LaunchesPageData> {
    return this.launchesRestService.upcomingLaunches$(criteria).pipe(
      exhaustMap((pageData: LaunchesPageData) => {
        return this.launchesStateFacade.setLaunches$(pageData).pipe(mapTo(pageData));
      })
    );
  }
}

