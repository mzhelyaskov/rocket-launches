import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Page} from '@@widgets/pagination/models/page';
import {CollectionUtils} from '@@widgets/pagination/utils/collection-utils';

@Component({
  selector: 'app-pagination',
  templateUrl: 'pagination.component.html',
  styleUrls: ['pagination.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PaginationComponent),
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements ControlValueAccessor, OnInit {

  private _onChange: (pageNumber: number) => void;
  private _onTouch: () => void;
  private _totalItems = 0;
  private _itemsPerPage = 0;
  private _pageNumber = 1;

  public hasHiddenPagesOnRight: boolean;
  public hasHiddenPagesOnLeft: boolean;
  public totalPages = 0;
  public pages: Page[];

  @Input() maxSize = 0;

  constructor(private cdr: ChangeDetectorRef) {
    this.maxSize = 10;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  @Input()
  get itemsPerPage(): number {
    return this._itemsPerPage;
  }

  set itemsPerPage(itemsPerPage: number) {
    this._itemsPerPage = itemsPerPage;
    this.totalPages = this.calculateTotalPages();
  }

  get totalItems(): number {
    return this._totalItems;
  }

  @Input()
  set totalItems(totalItems: number) {
    this._totalItems = totalItems;
    this.totalPages = this.calculateTotalPages();
    this.pages = this.getPages(this.pageNumber, this.totalPages);
    this.updateHiddenPagesHints();
  }

  set pageNumber(pageNumber: number) {
    this._pageNumber = pageNumber;
  }

  get pageNumber(): number {
    return this._pageNumber;
  }

  ngOnInit() {
    this.pages = this.getPages(this.pageNumber, this.totalPages);
    this.updateHiddenPagesHints();
  }

  registerOnChange(fn: any): void {
    this._onChange = (pageNumber: number) => fn(pageNumber);
  }

  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  writeValue(pageNumber: any): void {
    this.pageNumber = pageNumber;
    if (pageNumber) {
      this.pages = this.getPages(this.pageNumber, this.totalPages);
      this.updateHiddenPagesHints();
      this.cdr.detectChanges();
    }
  }

  private calculateTotalPages(): number {
    const totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
    return Math.max(totalPages || 0, 1);
  }

  private getPages(currentPage: number, totalPages: number): Page[] {
    const pages: Page[] = [];
    let startPage = 1;
    let endPage = totalPages;
    if (this.maxSize) {
      startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
      endPage = startPage + this.maxSize - 1;
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(endPage - this.maxSize + 1, 1);
      }
    }
    for (let num = startPage; num <= endPage; num++) {
      const page = this.makePage(num, num.toString(), num === currentPage);
      pages.push(page);
    }
    return pages;
  }

  private updateHiddenPagesHints() {
    if (CollectionUtils.isNotEmpty(this.pages)) {
      const firstPage = CollectionUtils.getFirstItem(this.pages);
      this.hasHiddenPagesOnLeft = firstPage.number > 1;
      const lastPage = CollectionUtils.getLastItem(this.pages);
      this.hasHiddenPagesOnRight = lastPage.number < this.totalPages;
    }
  }

  private makePage(num: number, text: string, active: boolean): Page {
    return {text, number: num, active};
  }

  private selectPage(pageNumber: number, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.writeValue(pageNumber);
    this._onChange(pageNumber);
  }
}
