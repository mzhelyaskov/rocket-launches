import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {faSearch, faSpinner, faTruckLoading} from '@fortawesome/free-solid-svg-icons';
import {MULTI_SELECT_DROPDOWN_DATA_SERVICE} from '@@widgets/multiselect-dropdown/config/multi-select-dropdown.config';
import {MultiSelectDropdownDataService} from '@@widgets/multiselect-dropdown/services/multi-select-dropdown-data.service';
import {takeUntil} from 'rxjs/operators';
import {DropdownListItem} from '@@widgets/multiselect-dropdown/models/dropdown-list-item';
import {FormControl} from '@angular/forms';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons/faAngleDown';
import {CollectionUtils} from '@@core/utils/collection.utils';

@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: 'multi-select-dropdown.component.html',
  styleUrls: ['multi-select-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiSelectDropdownComponent implements OnInit, OnDestroy {

  @ViewChild('scrollFrame', {static: false}) scrollFrame: ElementRef;

  private unsubscribe$: Subject<void>;
  private selectedListItems: { [key: string]: DropdownListItem };

  public value: string;
  public faSearch: any;
  public faAngleDown: any;
  public faSpinner: any;
  public faTruckLoading: any;
  public displayItems: DropdownListItem[];
  public dropdownVisible: boolean;
  public searchInputControl: FormControl;
  public items: DropdownListItem[];
  public selectedItem: DropdownListItem;
  public loaded: boolean;
  public loading$: Observable<boolean>;

  @Input() toggleLabel: boolean;

  @Output() changed: EventEmitter<string>;

  constructor(@Inject(MULTI_SELECT_DROPDOWN_DATA_SERVICE) private dataService: MultiSelectDropdownDataService,
              private elementRef: ElementRef,
              private cdr: ChangeDetectorRef) {
    this.unsubscribe$ = new Subject<void>();
    this.searchInputControl = new FormControl(null);
    this.value = null;
    this.faSearch = faSearch;
    this.faSpinner = faSpinner;
    this.faAngleDown = faAngleDown;
    this.faTruckLoading = faTruckLoading;
    this.changed = new EventEmitter<string>();
    this.selectedListItems = {};
    this.loading$ = dataService.loading$.asObservable();
  }

  ngOnInit(): void {
    this.dataService.itemsSource$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((items: DropdownListItem[]) => {
        this.items = items.map(i => ({...i}));
        const namePart = this.searchInputControl.value;
        this.updateDisplayItems(namePart, 'SOURCE change');
        if (CollectionUtils.isNotEmpty(this.items)) {
          this.loaded = true;
        }
        this.cdr.detectChanges();
      });

    this.searchInputControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((namePart: string) => {
        this.updateDisplayItems(namePart, 'search INPUT change');
        this.cdr.detectChanges();
      });
  }

  isSelected(item: DropdownListItem): boolean {
    return this.selectedItem?.code === item.code;
  }

  onSelectionChange(item: DropdownListItem) {
    this.selectedItem = item;
  }

  onRestClick() {
    this.searchInputControl.reset();
    this.selectedItem = null;
    this.displayItems = this.items;
  }

  onSaveClick() {
    this.searchInputControl.reset();
    this.changed.emit(this.selectedItem?.label || '');
    this.closeDropdown();
  }

  onOpenClick(): void {
    this.dropdownVisible = true;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  scrolled(): void {
    if (this.isUserNearBottom() && !this.searchInputControl.value) {
      this.loadNextItemsPart('scroll');
    }
  }

  private updateDisplayItems(namePart: string, reason: string) {
    console.log('UPDATE REASON', reason);
    if (namePart) {
      this.displayItems = this.items.filter(MultiSelectDropdownComponent.namePartPredicate(namePart));
      if (CollectionUtils.isEmpty(this.displayItems)) {
        console.log('after', namePart);
        this.loadNextItemsPart('empty DISPLAY items');
      }
    } else {
      this.displayItems = this.items;
      if (CollectionUtils.isEmpty(this.items)) {
        this.loadNextItemsPart('empty INITIAL items');
      }
    }
  }

  private loadNextItemsPart(reason: string) {
    console.log('REASON:', reason);
    if (!this.dataService.loading$.getValue()) {
      console.log('fetchNextPageItems$');
      this.dataService.fetchNextPageItems$();
    }
  }

  private closeDropdown() {
    setTimeout(() => {
      this.dropdownVisible = false;
      this.cdr.detectChanges();
    });
  }

  private static namePartPredicate(namePart: string): (i: DropdownListItem) => boolean {
    return i => i.label.toLowerCase().includes((namePart || '').toLowerCase());
  }

  private isUserNearBottom(): boolean {
    const scrollContainer = this.scrollFrame.nativeElement;
    const threshold = 10;
    const position = scrollContainer.scrollTop + scrollContainer.offsetHeight;
    const height = scrollContainer.scrollHeight;
    return position > height - threshold;
  }
}
