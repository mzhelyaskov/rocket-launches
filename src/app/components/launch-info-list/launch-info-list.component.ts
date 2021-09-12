import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {LaunchesInfoService} from '@@app/services/launches-info.service';
import {LaunchesStateFacade} from '@@app/store/launches-state.facade';
import {filter, takeUntil} from 'rxjs/operators';
import {CollectionUtils} from '@@widgets/multiselect-dropdown/utils/collection.utils';
import {Subject} from 'rxjs';
import {LaunchesPageData} from '@@shared/models/launches-page-data';
import {LaunchesStateModel} from '@@shared/models/launches-state-model';
import {LaunchesSearchCriteria} from '@@shared/models/launches-search-criteria';

@Component({
  selector: 'app-launch-info-list',
  templateUrl: 'launch-info-list.component.html',
  styleUrls: ['launch-info-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchInfoListComponents implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void>;
  public loaded: boolean;
  public launchesPage: LaunchesPageData;
  public launchesSearchCriteria: LaunchesSearchCriteria;

  constructor(private launchesInfoService: LaunchesInfoService,
              private launchesStateFacade: LaunchesStateFacade,
              private cdr: ChangeDetectorRef) {
    this.unsubscribe$ = new Subject<void>();
  }

  ngOnInit() {
    this.launchesInfoService.fetchFirstUpcomingLaunchesPage$().subscribe();

    this.launchesStateFacade.state$
      .pipe(filter(s => Boolean(s.launchesPage)), takeUntil(this.unsubscribe$))
      .subscribe((state: LaunchesStateModel) => {
        this.loaded = true;
        this.launchesSearchCriteria = state.launchesSearchCriteria;
        this.launchesPage = state.launchesPage;
        this.cdr.detectChanges();
      });
  }

  onPrevPageClick() {
    this.launchesInfoService.fetchPrevUpcomingLaunchesPage$().subscribe();
  }

  onNextPageClick() {
    this.launchesInfoService.fetchNextUpcomingLaunchesPage$().subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
