import {MultiSelectDropdownDataService} from '@@widgets/multiselect-dropdown/services/multi-select-dropdown-data.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {DropdownListItem} from '@@widgets/multiselect-dropdown/models/dropdown-list-item';
import {map} from 'rxjs/operators';
import {LaunchesStateFacade} from '@@app/store/launches-state.facade';
import {LaunchLocation} from '@@shared/models/launch-location';
import {Injectable} from '@angular/core';
import {LaunchesInfoService} from '@@app/services/launches-info.service';
import {LaunchLocationsPage} from '@@shared/models/launch-locations-page';
import {ApiUrlConfig} from '@@app/config/api-url.config';
import {LaunchLocationsConverter} from '@@shared/converters/launch-locations.converter';

@Injectable()
export class LaunchesDropdownDataService implements MultiSelectDropdownDataService {

  public loading$: BehaviorSubject<boolean>;

  constructor(private launchesStateFacade: LaunchesStateFacade,
              private launchesInfoService: LaunchesInfoService) {
    this.loading$ = new BehaviorSubject<boolean>(false);
  }

  getItems$(): Observable<DropdownListItem[]> {
    const page: LaunchLocationsPage = this.launchesStateFacade.getLastLaunchesLocationsPage();
    if (page && !page.next) {
      return this.getDropdownItemItems$();
    }
    this.loading$.next(true);
    (async () => {
      const getPageFn$ = (url: string) => this.launchesInfoService.fetchLaunchLocationPage$(url).toPromise();
      for await (const page of iterateOverAllLaunchLocationPages$(getPageFn$)) {}
      this.loading$.next(false);
    })();
    return this.getDropdownItemItems$();
  }

  private getDropdownItemItems$() {
    return this.launchesStateFacade.launchLocations$.pipe(map((locations: LaunchLocation[]) => {
      return LaunchLocationsConverter.toDropdownListItem(locations);
    }));
  }
}

async function* iterateOverAllLaunchLocationPages$(getPage$: (url: string) => Promise<LaunchLocationsPage>) {
  let url = ApiUrlConfig.LAUNCH_LOCATIONS_INITIAL_URL;
  while (url) {
    const page: LaunchLocationsPage = await getPage$(url);
    url = page?.next
    yield page;
  }
}
