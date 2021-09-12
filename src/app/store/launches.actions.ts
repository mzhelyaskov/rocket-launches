import {LaunchInfo} from '@@shared/models/launch-info';
import {LaunchesPageData} from '@@shared/models/launches-page-data';

export class SetLaunchPageData {
  static readonly type = '[LAUNCHES] set launches';

  constructor(public pageData: LaunchesPageData) {}
}


