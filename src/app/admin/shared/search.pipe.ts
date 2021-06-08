import {Pipe, PipeTransform} from "@angular/core";
import {TimepadEvent} from "../../../environments/interface";

@Pipe({
  name: 'searchEvents'
})
export class SearchPipe implements PipeTransform {
  transform(events: TimepadEvent[], searchStr = ''): TimepadEvent[] {
    if (!searchStr.trim()) {
      return events
    }

    return events.filter(event => {
      return event.name.toLowerCase().includes(searchStr.toLowerCase())
    })
  }

}
