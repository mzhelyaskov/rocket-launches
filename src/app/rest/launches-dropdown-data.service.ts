import {MultiSelectDropdownDataService} from '@@widgets/multiselect-dropdown/services/multi-select-dropdown-data.service';
import {Observable, of} from 'rxjs';
import {DropdownListItem} from '@@widgets/multiselect-dropdown/models/dropdown-list-item';

export class LaunchesDropdownDataService implements MultiSelectDropdownDataService {

  getDropdownItems$(): Observable<DropdownListItem[]> {
    return of([]);
  }
}
