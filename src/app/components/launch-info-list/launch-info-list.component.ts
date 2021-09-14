import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LaunchesInfoService} from '@@app/services/launches-info.service';
import {LaunchesStateFacade} from '@@app/store/launches-state.facade';
import {filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {LaunchesPage} from '@@shared/models/launches-page';
import {LaunchesStateModel} from '@@shared/models/launches-state-model';
import {CollectionUtils} from '@@core/utils/collection.utils';

@Component({
  selector: 'app-launch-info-list',
  templateUrl: 'launch-info-list.component.html',
  styleUrls: ['launch-info-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchInfoListComponents implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void>;
  public loaded: boolean;
  public launchesPage: LaunchesPage;
  public thereAreNoAvailableLaunches: boolean;

  @Input() itemsPerPage: number;

  constructor(private launchesInfoService: LaunchesInfoService,
              private launchesStateFacade: LaunchesStateFacade,
              private cdr: ChangeDetectorRef) {
    this.unsubscribe$ = new Subject<void>();
  }

  ngOnInit() {
    this.launchesInfoService.fetchUpcomingLaunchesPage$().subscribe();

    this.launchesStateFacade.state$
      .pipe(filter(s => Boolean(s.launchesPage)), takeUntil(this.unsubscribe$))
      .subscribe((state: LaunchesStateModel) => {
        this.loaded = true;
        this.launchesPage = state.launchesPage;
        this.thereAreNoAvailableLaunches = CollectionUtils.isEmpty(state.launchesPage?.results);
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
