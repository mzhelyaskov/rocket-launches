import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LaunchesPageCriteria} from '@@shared/models/launches-page-criteria';
import {LaunchesPage} from '@@shared/models/launches-page';
import {LaunchLocationsPage} from '@@shared/models/launch-locations-page';
import {Cache} from '@@shared/decorators/cache.decorator';
import {ApiUrlConfig} from '@@app/config/api-url.config';
import {HttpUtils} from '@@core/utils/http.utils';
import {delay} from 'rxjs/operators';
import {CollectionUtils} from '@@core/utils/collection.utils';

const LOCATIONS_API_REQUEST_DELAY = 1000;

@Injectable({providedIn: 'root'})
export class LaunchesRestService {

  constructor(private http: HttpClient) {}

  @Cache('upcoming_launches')
  upcomingLaunchesPage$(criteria: LaunchesPageCriteria): Observable<LaunchesPage> {
    const params = HttpUtils.createQueryParams({
      offset: criteria?.offset,
      limit: criteria?.limit,
      location__ids: CollectionUtils.isNotEmpty(criteria?.locationCodes) ? criteria.locationCodes.join(',') : null
    });
    return this.http.get<LaunchesPage>(ApiUrlConfig.UPCOMING_LAUNCHES_INITIAL_URL, {params});
  }

  @Cache('launch_location_page')
  getNextLaunchLocationsPage$(pageUrl: string): Observable<LaunchLocationsPage> {
    // Use delay to avoid "429 TOO_MANY_REQUEST" error
    return this.http.get<LaunchLocationsPage>(pageUrl).pipe(delay(LOCATIONS_API_REQUEST_DELAY));
  }
}

