import {LaunchLocation} from '@@shared/models/launch-location';

export interface LaunchLocationsPage {
  count: number,
  next: string,
  previous: string,
  results: LaunchLocation[];
}
