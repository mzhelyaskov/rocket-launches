import {Observable} from 'rxjs';
import {DropdownListItem} from '@@widgets/multiselect-dropdown/models/dropdown-list-item';

export interface MultiSelectDropdownDataService {

  getDropdownItems$(): Observable<DropdownListItem[]>;
}
