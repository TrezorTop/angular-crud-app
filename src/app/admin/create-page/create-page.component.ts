import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TimepadEvent} from "../../../environments/interface";
import {timepadApi} from "../../../environments/environment";
import {EventsService} from "../../shared/events.service";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  form: FormGroup

  constructor(private eventsService: EventsService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      starts_at: new FormControl(null, Validators.required),
      description_short: new FormControl(null, Validators.maxLength(64))
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
      ]
    }

    this.eventsService.postEvent(event).subscribe(() => {
      this.form.reset()
    })
  }

  autoGrowTextZone(e) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight + 25)+"px";
  }
}
