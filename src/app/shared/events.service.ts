import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TimepadEvent} from "../../environments/interface";
import {timepadApi} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class EventsService {
  constructor(private http: HttpClient) {
  }

  postEvent(event: TimepadEvent): Observable<TimepadEvent> {

    let headers = new HttpHeaders({
      'Authorization': 'Bearer 3b7a3df04437873355e5a79c63cf9cc0578c34ac'
    })

    let options = {headers: headers}

    return this.http.post<TimepadEvent>(`${timepadApi.apiUrl}/events.json`, event, options)
  }
}
