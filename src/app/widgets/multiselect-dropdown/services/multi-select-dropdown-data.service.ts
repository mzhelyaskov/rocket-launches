import {BehaviorSubject} from 'rxjs';
import {DropdownListItem} from '@@widgets/multiselect-dropdown/models/dropdown-list-item';

export interface MultiSelectDropdownDataService {

  loading$: BehaviorSubject<boolean>;

  itemsSource$: BehaviorSubject<DropdownListItem[]>;

  fetchNextPageItems$(): void;
}
