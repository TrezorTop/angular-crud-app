import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TimepadEvent} from "../../../environments/interface";
import {timepadApi} from "../../../environments/environment";
import {EventsService} from "../../shared/events.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AlertService} from "../shared/alert.service";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  autoGrowTextZone(e) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight + 25) + "px";
  }

  form: FormGroup

  message: string

  constructor(private eventsService: EventsService, private route: ActivatedRoute, private alert: AlertService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['internalServerError']) {
        this.message = "Event added, but something went wrong on the server (internal server error, it is a TimepadAPI bug)"
      } else if (params['authorizationError']) {
        this.message = "Organization Api Key is invalid"
      }
    })

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      starts_at: new FormControl(null, Validators.required),
      description_short: new FormControl(null, Validators.maxLength(500))
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    let event: TimepadEvent = {
      organization: {
        id: timepadApi.organization.id,
        subdomain: timepadApi.organization.subdomain
      },
      starts_at: this.form.value.starts_at,
      name: this.form.value.name,
      categories: [
        {
          id: "462",
          name: "Другие события"
        }
      ],
      description_short: this.form.value.description_short
    }

    this.eventsService.postEvent(event).subscribe(() => {
        this.form.reset()
        this.alert.success('Event successfully registered')
      }, () => {
        this.form.reset()
        this.alert.warning('Event added, but something went wrong on the server (internal server error, it is a TimepadAPI bug)')
      }
    )
  }
}
