import {LaunchesPage} from '@@shared/models/launches-page';
import {LaunchLocation} from '@@shared/models/launch-location';
import {LaunchesPageCriteria} from '@@shared/models/launches-page-criteria';
import {LaunchLocationsPage} from '@@shared/models/launch-locations-page';

export class SetLaunchPageData {
  static readonly type = '[LAUNCHES] set launches page data';

  constructor(public pageData: LaunchesPage) {}
}

export class SetLastLoadedLaunchLocationPage {
  static readonly type = '[LAUNCHES] set last loaded launch location page';

  constructor(public page: LaunchLocationsPage) {}
}

export class AddLaunchLocations {
  static readonly type = '[LAUNCHES] add launch locations';

  constructor(public launchLocations: LaunchLocation[]) {}
}

export class UpdateLaunchesPageCriteriaParams {
  static readonly type = '[LAUNCHES] update launches page criteria params';

  constructor(public pageCriteria: LaunchesPageCriteria) {}
}


