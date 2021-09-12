import {Injectable, InjectionToken} from '@angular/core';
import {MultiSelectDropdownDataService} from '../services/multi-select-dropdown-data.service';

@Injectable({providedIn: 'root'})
export class MultiSelectDropdownConfig {
  translations: string;
}

export const MULTI_SELECT_DROPDOWN_DATA_SERVICE = new InjectionToken<MultiSelectDropdownDataService>('MULTI_SELECT_DROPDOWN_DATA_SERVICE');
