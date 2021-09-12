import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LaunchesSearchCriteria} from '@@shared/models/launches-search-criteria';
import {LaunchesPageData} from '@@shared/models/launches-page-data';

@Injectable({providedIn: 'root'})
export class LaunchesRestService {

  constructor(private http: HttpClient) {}

  upcomingLaunches$(filterCriteria?: LaunchesSearchCriteria): Observable<LaunchesPageData> {
    const url = filterCriteria ? filterCriteria.url : `https://ll.thespacedevs.com/2.2.0/launch/upcoming/`;
    return this.http.get<LaunchesPageData>(url);
  }
}
