import {LaunchInfo} from '@@shared/models/launch-info';
import {LaunchesPageData} from '@@shared/models/launches-page-data';

export class AddLaunches {
  static readonly type = '[LAUNCHES] add launches';

  constructor(public launches: LaunchInfo[]) {}
}

export class SetLaunchPageData {
  static readonly type = '[LAUNCHES] set launches';

  constructor(public pageData: LaunchesPageData) {}
}


