import {Component, Input, OnInit} from '@angular/core';
import {TimepadEvent} from "../../../../environments/interface";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input() event: TimepadEvent

  constructor() { }

  ngOnInit(): void {
  }

}
