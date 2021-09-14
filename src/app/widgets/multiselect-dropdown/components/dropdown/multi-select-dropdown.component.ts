import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output
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

  private unsubscribe$: Subject<void>;

  public faSearch: any;
  public faAngleDown: any;
  public faSpinner: any;
  public faTruckLoading: any;
  public displayItems: DropdownListItem[];
  public dropdownVisible: boolean;
  public searchInputControl: FormControl;
  public items: DropdownListItem[];
  public itemCodeToSelectionFlag: { [key: string]: boolean };
  public loaded: boolean;
  public loading$: Observable<boolean>;

  @Input() toggleLabel: boolean;

  @Output() changed: EventEmitter<string[]>;

  @HostListener('document:click', ['$event']) closeIfOnOutsideClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

  constructor(@Inject(MULTI_SELECT_DROPDOWN_DATA_SERVICE) private dataService: MultiSelectDropdownDataService,
              private elementRef: ElementRef,
              private cdr: ChangeDetectorRef) {
    this.unsubscribe$ = new Subject<void>();
    this.searchInputControl = new FormControl(null);
    this.faSearch = faSearch;
    this.faSpinner = faSpinner;
    this.faAngleDown = faAngleDown;
    this.faTruckLoading = faTruckLoading;
    this.changed = new EventEmitter<string[]>();
    this.loading$ = dataService.loading$.asObservable();
    this.itemCodeToSelectionFlag = {};
  }

  get searchQuery(): string {
    return this.searchInputControl.value;
  }

  ngOnInit(): void {
    this.dataService.getItems$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((items: DropdownListItem[]) => {
        this.items = items.map(i => ({...i}));
        this.updateDisplayItems(this.searchQuery);
        if (CollectionUtils.isNotEmpty(this.items)) {
          this.loaded = true;
        }
        this.cdr.detectChanges();
      });

    this.searchInputControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((searchQuery: string) => {
        this.updateDisplayItems(searchQuery);
        this.cdr.detectChanges();
      });
  }

  onSelectionChange(checked: boolean, item: DropdownListItem) {
    if (checked) {
      this.itemCodeToSelectionFlag[item.code] = true;
    } else {
      delete this.itemCodeToSelectionFlag[item.code];
    }
  }

  onLabelClick(item: DropdownListItem) {
    const checked = Boolean(this.itemCodeToSelectionFlag[item.code]);
    this.onSelectionChange(!checked, item);
  }

  onRestClick() {
    this.searchInputControl.reset();
    this.itemCodeToSelectionFlag = {};
    this.displayItems = this.items;
  }

  onSaveClick() {
    this.searchInputControl.reset();
    this.changed.emit(this.getSelectedLocationCodes());
    this.closeDropdown();
  }

  onOpenClick(): void {
    this.dropdownVisible = true;
  }

  trackByDisplayItem(index: number, item: DropdownListItem): string {
    return item.code;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private updateDisplayItems(namePart: string) {
    if (namePart) {
      this.displayItems = this.items.filter(MultiSelectDropdownComponent.namePartPredicate(namePart));
    } else {
      this.displayItems = this.items;
    }
  }

  private getSelectedLocationCodes() {
    return this.items.filter(i => this.itemCodeToSelectionFlag[i.code]).map(i => i.code);
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
}
