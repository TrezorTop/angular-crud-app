import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventsService} from "../../shared/events.service";
import {TimepadEvent} from "../../../environments/interface";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {

  events$: Observable<TimepadEvent[]> = this.eventsService.eventsState$;
  searchStr = ''

  constructor(private eventsService: EventsService) { }
}
