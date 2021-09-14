import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {LaunchesPageCriteria} from '@@shared/models/launches-page-criteria';
import {LaunchesInfoService} from '@@app/services/launches-info.service';
import {LaunchesStateFacade} from '@@app/store/launches-state.facade';
import {exhaustMap, filter} from 'rxjs/operators';
import {LaunchesStateModel} from '@@shared/models/launches-state-model';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public control: FormControl;
  public itemsPerPage: number;
  public totalItems: number;
  public currentPageNumber: number;
  public loaded: boolean;

  constructor(private launchesInfoService: LaunchesInfoService,
              private launchesStateFacade: LaunchesStateFacade,
              private cdr: ChangeDetectorRef) {
    this.control = new FormControl(null);
    this.currentPageNumber = 1;
    this.itemsPerPage = 10;
    this.totalItems = 1;
  }

  ngOnInit(): void {
    this.launchesStateFacade.state$
      .pipe(filter(s => Boolean(s.launchesPage)))
      .subscribe((state: LaunchesStateModel) => {
        this.loaded = true;
        this.totalItems = state.launchesPage.count;
        this.cdr.detectChanges();
      });
  }

  onSelectedItemsChange(locationCodes: string[]) {
    const criteria: LaunchesPageCriteria = {locationCodes};
    this.launchesStateFacade.updateLaunchesPageCriteriaParams$(criteria)
      .pipe(exhaustMap(() => this.launchesInfoService.fetchUpcomingLaunchesPage$()))
      .subscribe();
  }

  onPageNumberChange(pageNumber: number) {
    this.currentPageNumber = pageNumber;
    const criteria: LaunchesPageCriteria = {limit: this.itemsPerPage, offset: (pageNumber - 1) * this.itemsPerPage};
    this.launchesStateFacade.updateLaunchesPageCriteriaParams$(criteria)
      .pipe(exhaustMap(() => this.launchesInfoService.fetchUpcomingLaunchesPage$()))
      .subscribe();
  }
}
