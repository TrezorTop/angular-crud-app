import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventsService} from "../../shared/events.service";
import {TimepadEvent} from "../../../environments/interface";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  events: TimepadEvent[] = []

  sub: Subscription
  searchStr = ''

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.sub = this.eventsService.getOrganizationEvents().subscribe(events => {
      this.events = events
    })
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }
}
