import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {EventsService} from "../shared/events.service";
import {Observable} from "rxjs";
import {TimepadEvent} from "../../environments/interface";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {

  event$: Observable<TimepadEvent>

  constructor(private route: ActivatedRoute, private eventsService: EventsService) {
  }

  ngOnInit(): void {
    this.event$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.eventsService.getEventById(params['id'])
      })
    )
  }

}
