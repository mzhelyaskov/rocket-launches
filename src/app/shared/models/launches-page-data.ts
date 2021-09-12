import {LaunchInfo} from '@@shared/models/launch-info';

export interface LaunchesPageData {
  count: number;
  next: string;
  previous: string;
  results: LaunchInfo[];
}
