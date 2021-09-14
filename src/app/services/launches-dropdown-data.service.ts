import {MultiSelectDropdownDataService} from '@@widgets/multiselect-dropdown/services/multi-select-dropdown-data.service';
import {BehaviorSubject, EMPTY, Observable, Subject} from 'rxjs';
import {DropdownListItem} from '@@widgets/multiselect-dropdown/models/dropdown-list-item';
import {delay, finalize, map} from 'rxjs/operators';
import {LaunchesStateFacade} from '@@app/store/launches-state.facade';
import {LaunchLocation} from '@@shared/models/launch-location';
import {Injectable} from '@angular/core';
import {LaunchesInfoService} from '@@app/services/launches-info.service';
import {LaunchLocationsPage} from '@@shared/models/launch-locations-page';

@Injectable()
export class LaunchesDropdownDataService implements MultiSelectDropdownDataService {

  public loading$: BehaviorSubject<boolean>;
  public itemsSource$: BehaviorSubject<DropdownListItem[]>;

  constructor(private launchesStateFacade: LaunchesStateFacade,
              private launchesInfoService: LaunchesInfoService) {
    this.loading$ = new BehaviorSubject<boolean>(false);
    this.itemsSource$ = new BehaviorSubject<DropdownListItem[]>([]);
  }

  fetchNextPageItems$(): void {
    const page: LaunchLocationsPage = this.launchesStateFacade.getLastLaunchesLocationsPage();
    if (page && !page.next) {
      return;
    }
    this.loading$.next(true);
    this.launchesInfoService.fetchNextLaunchLocationPage$().pipe(
      map(() => this.launchesStateFacade.getLaunchLocations().map((location: LaunchLocation) => {
        return {code: String(location.id), label: location.name, selected: false};
      })),
      finalize(() => this.loading$.next(false))
    ).subscribe(this.itemsSource$);
  }

  getItems$(): Observable<LaunchLocation[]> {
    const page: LaunchLocationsPage = this.launchesStateFacade.getLastLaunchesLocationsPage();
    if (page && !page.next) {
      return EMPTY;
    }
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
