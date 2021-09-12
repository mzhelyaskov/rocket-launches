import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {LaunchesSearchCriteria} from '@@shared/models/launches-search-criteria';
import {LaunchesPageData} from '@@shared/models/launches-page-data';
import {Memoize} from '@@shared/decorators/memoizee.decorator';

const INITIAL_URL = `https://ll.thespacedevs.com/2.2.0/launch/upcoming/`;

@Injectable({providedIn: 'root'})
export class LaunchesRestService {

  constructor(private http: HttpClient) {}

  @Memoize()
  upcomingLaunches$(filterCriteria?: LaunchesSearchCriteria): Observable<LaunchesPageData> {
    const url = filterCriteria ? filterCriteria.url : INITIAL_URL;
    return this.http.get<LaunchesPageData>(url);
  }
}
