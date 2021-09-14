import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {LaunchesPageCriteria} from '@@shared/models/launches-page-criteria';
import {LaunchesPage} from '@@shared/models/launches-page';
import {LaunchLocationsPage} from '@@shared/models/launch-locations-page';
import {Cache} from '@@shared/decorators/cache.decorator';
import {ApiUrlConfig} from '@@app/config/api-url.config';
import {LaunchLocation} from '@@shared/models/launch-location';
import {HttpUtils} from '@@core/utils/http.utils';
import {UiLocking} from '@@ui-locker/decorators/ui-locker.decorator';
import {delay} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class LaunchesRestService {

  constructor(private http: HttpClient) {}

  @UiLocking()
  @Cache('upcoming_launches')
  upcomingLaunchesPage$(criteria: LaunchesPageCriteria): Observable<LaunchesPage> {
    const params = HttpUtils.createQueryParams({
      offset: criteria?.offset,
      limit: criteria?.limit,
      name: criteria?.launchLocationName
    });
    return this.http.get<LaunchesPage>(ApiUrlConfig.UPCOMING_LAUNCHES_INITIAL_URL, {params});
  }

  @UiLocking()
  @Cache('launch_location_page')
  getNextLaunchLocationsPage$(pageUrl: string): Observable<LaunchLocationsPage> {
    return this.http.get<LaunchLocationsPage>(pageUrl);
  }

  @UiLocking()
  @Cache('all_launch_locations')
  getAllLaunchLocations$(): Observable<LaunchLocation[]> {
    const allLocations: LaunchLocation[] = [];
    const allLocations$: Subject<LaunchLocation[]> = new Subject<LaunchLocation[]>();
    (async () => {
      const getPage = (url: string) => this.http.get<LaunchLocationsPage>(url).pipe(delay(2000)).toPromise();
      for await (const locations of getAllLaunchLocations$(getPage)) {
        allLocations.push.apply(allLocations, locations);
      }
      allLocations$.next(allLocations);
      allLocations$.complete();
    })();
    return allLocations$.asObservable();
  }
}

async function* getAllLaunchLocations$(getLocationPage$: (url: string) => Promise<LaunchLocationsPage>) {
  let url = ApiUrlConfig.LAUNCH_LOCATIONS_INITIAL_URL;
  while (url) {
    const page: LaunchLocationsPage = await getLocationPage$(url);
    url = page.next
    yield page.results;
  }
}
