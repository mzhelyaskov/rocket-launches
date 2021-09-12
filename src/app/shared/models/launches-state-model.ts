import {LaunchesSearchCriteria} from '@@shared/models/launches-search-criteria';
import {LaunchesPageData} from '@@shared/models/launches-page-data';

export interface LaunchesStateModel {
  launchesPageNumber: number;
  launchesSearchCriteria: LaunchesSearchCriteria;
  launchesPage: LaunchesPageData;
}
