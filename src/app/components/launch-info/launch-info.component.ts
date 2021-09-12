import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {LaunchInfo} from '@@shared/models/launch-info';

@Component({
  selector: 'app-launch-info',
  templateUrl: 'launch-info.component.html',
  styleUrls: ['launch-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchInfoComponents {

  @Input() launchInfo: LaunchInfo;
}
