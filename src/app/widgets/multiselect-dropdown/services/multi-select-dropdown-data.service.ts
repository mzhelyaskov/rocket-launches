import {BehaviorSubject, Observable} from 'rxjs';
import {DropdownListItem} from '@@widgets/multiselect-dropdown/models/dropdown-list-item';

export interface MultiSelectDropdownDataService {

  loading$: BehaviorSubject<boolean>;

  getItems$(): Observable<DropdownListItem[]>;
}
