import {DropdownListItem} from '@@widgets/multiselect-dropdown/models/dropdown-list-item';
import {LaunchLocation} from '@@shared/models/launch-location';

export class LaunchLocationsConverter {

  static toDropdownListItem(locations: LaunchLocation[]): DropdownListItem[] {
    return locations.map((location: LaunchLocation) => {
      return {code: String(location.id), label: location.name};
    })
  }
}
