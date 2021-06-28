import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {EventsService} from "../../shared/events.service";
import {switchMap} from "rxjs/operators";
import {TimepadEvent} from "../../../environments/interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../shared/alert.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  form: FormGroup
  eventToUpdate: TimepadEvent

  submitted = false

  constructor(private route: ActivatedRoute, private eventsService: EventsService, private alert: AlertService) {
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.eventsService.getEventById(parseInt(params['id']))
      })
    ).subscribe((event: TimepadEvent) => {
      this.eventToUpdate = event

      this.form = new FormGroup({
        name: new FormControl(event.name, Validators.required),
        starts_at: new FormControl(String(event.starts_at).slice(0, -5), Validators.required),
        description_short: new FormControl(event.description_short),
      })
    })
  }

  autoGrowTextZone(e) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight + 25) + "px";
  }

  updateEvent() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    this.eventsService.updateEvent({
      id: this.eventToUpdate.id,
      name: this.form.value.name,
      starts_at: this.form.value.starts_at + '+0300',
      description_short: this.form.value.description_short
    }).subscribe(() => {
      this.submitted = false
      this.alert.success('Event successfully updated')
    }, (error) => {
      this.submitted = false

      this.alert.danger(`An error occurred! Error code: ${error.error.response_status.error_code}, Error message: ${error.error.response_status.message}`)
    })
  }
}
