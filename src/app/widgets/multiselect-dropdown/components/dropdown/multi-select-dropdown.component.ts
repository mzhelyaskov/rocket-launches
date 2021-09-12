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
import {Subject} from 'rxjs';
import {faSearch, faTruckLoading} from '@fortawesome/free-solid-svg-icons';
import {MULTI_SELECT_DROPDOWN_DATA_SERVICE} from '@@widgets/multiselect-dropdown/config/multi-select-dropdown.config';
import {MultiSelectDropdownDataService} from '@@widgets/multiselect-dropdown/services/multi-select-dropdown-data.service';
import {takeUntil} from 'rxjs/operators';
import {DropdownListItem} from '@@widgets/multiselect-dropdown/models/dropdown-list-item';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: 'multi-select-dropdown.component.html',
  styleUrls: ['multi-select-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiSelectDropdownComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void>;

  public loaded: boolean;
  public value: string;
  public faSearch: any;
  public faTruckLoading: any;
  public items: DropdownListItem[];
  public visible: boolean;
  public searchInputControl: FormControl;

  @Input() toggleLabel: boolean;
  @Output() changed: EventEmitter<DropdownListItem[]>;

  @HostListener('document:click', ['$event']) onOutsideDropdownClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.visible = false;
    }
  }

  constructor(@Inject(MULTI_SELECT_DROPDOWN_DATA_SERVICE) private dataService: MultiSelectDropdownDataService,
              private elementRef: ElementRef,
              private cdr: ChangeDetectorRef) {
    this.unsubscribe$ = new Subject<void>();
    this.searchInputControl = new FormControl(null);
    this.value = null;
    this.faSearch = faSearch;
    this.faTruckLoading = faTruckLoading;
    this.changed = new EventEmitter<DropdownListItem[]>();
  }

  ngOnInit(): void {
    this.searchInputControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((query: string) => {
        console.log('query', query);
      });

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

  onOpenClick(): void {
    this.visible = true;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
