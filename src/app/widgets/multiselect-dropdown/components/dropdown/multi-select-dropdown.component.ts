import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {faCoffee} from '@fortawesome/free-solid-svg-icons';
import {MULTI_SELECT_DROPDOWN_DATA_SERVICE} from '@@widgets/multiselect-dropdown/config/multi-select-dropdown.config';
import {MultiSelectDropdownDataService} from '@@widgets/multiselect-dropdown/services/multi-select-dropdown-data.service';
import {takeUntil} from 'rxjs/operators';
import {DropdownListItem} from '@@widgets/multiselect-dropdown/models/dropdown-list-item';

@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: 'multi-select-dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiSelectDropdownComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void>;

  public loaded: boolean;
  public value: string;
  public faCoffee: any;
  public items: DropdownListItem[];

  @Output() changed: EventEmitter<DropdownListItem[]>;

  constructor(@Inject(MULTI_SELECT_DROPDOWN_DATA_SERVICE) private dataService: MultiSelectDropdownDataService,
              private cdr: ChangeDetectorRef) {
    this.unsubscribe$ = new Subject<void>();
    this.value = null;
    this.faCoffee = faCoffee;
    this.changed = new EventEmitter<DropdownListItem[]>();
  }

  ngOnInit(): void {
    this.unsubscribe$ = new Subject<void>();
    this.dataService.getDropdownItems$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((items: DropdownListItem[]) => {
        this.loaded = true;
        this.items = items;
        this.cdr.detectChanges();
      });
  }

  onRestClick() {
    this.items.forEach((i) => i.selected = false);
  }

  onSaveClick() {
    const selectedItems = this.items.filter((i) => i.selected);
    this.changed.emit(selectedItems);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
