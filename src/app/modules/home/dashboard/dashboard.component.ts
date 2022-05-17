import { Component, ViewEncapsulation } from '@angular/core';
import {
  TimelineViewsService,
  TimelineMonthService,
  AgendaService,
  EventSettingsModel,
  GroupModel,
  RenderCellEventArgs,
} from '@syncfusion/ej2-angular-schedule';
import { resourceData } from './datasource';
@Component({
  selector: 'app-dashboard',
  providers: [TimelineViewsService, TimelineMonthService, AgendaService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent {
  public selectedDate: Date = new Date();
  public views: Array<string> = [
    'TimelineDay',
    'TimelineWeek',
    'TimelineMonth',
    'Agenda',
  ];
  public eventSettings: EventSettingsModel = { dataSource: resourceData };
  public group: GroupModel = { resources: ['Rooms', 'Owners'] };
  public allowMultipleRoom = false;
  public allowMultipleOwner = true;
  public roomDataSource: Object[] = [
    { text: 'ROOM 1', id: 1, color: '#cb6bb2' },
    { text: 'ROOM 2', id: 2, color: '#56ca85' },
  ];
  public ownerDataSource: Object[] = [
    { text: 'Dr.Ahmed Abdelsalam', id: 1, groupId: 1, color: '#ffaa00' },
    { text: 'Dr.Mohab Nagy', id: 2, groupId: 2, color: '#f8a398' },
    { text: 'Dr.Ahmed Alaa', id: 3, groupId: 1, color: '#7499e1' },
    { text: 'Dr.Ahmed Abo Emara', id: 4, groupId: 2, color: '#7499e1' },
  ];
  public onRenderCell(args: RenderCellEventArgs): void {
    if (
      args.elementType === 'resourceGroupCells' &&
      args.element.className.indexOf('e-work-hours') > 0
    ) {
    }
  }
}
