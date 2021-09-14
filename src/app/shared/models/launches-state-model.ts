import {LaunchesPageCriteria} from '@@shared/models/launches-page-criteria';
import {LaunchesPage} from '@@shared/models/launches-page';
import {LaunchLocation} from '@@shared/models/launch-location';
import {LaunchLocationsPage} from '@@shared/models/launch-locations-page';

export interface LaunchesStateModel {
  lastLoadedLocationPage: LaunchLocationsPage;
  locations: LaunchLocation[];
  launchesPageCriteria: LaunchesPageCriteria;
  launchesPage: LaunchesPage;
}
