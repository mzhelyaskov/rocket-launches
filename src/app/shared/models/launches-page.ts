import {LaunchInfo} from '@@shared/models/launch-info';

export interface LaunchesPage {
  count: number;
  next: string;
  previous: string;
  results: LaunchInfo[];
}
