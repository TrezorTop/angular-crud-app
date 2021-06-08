import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {TimepadEvent, timepadEventResponse} from "../../environments/interface";
import {timepadApi} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class EventsService {
  constructor(private http: HttpClient) {
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${timepadApi.apiKey}`)
  }

  postEvent(event: TimepadEvent): Observable<TimepadEvent> {

    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${timepadApi.apiKey}`)

    return this.http.post(`${timepadApi.apiUrl}/events.json`, event, {headers: headers})
      .pipe(map((response: timepadEventResponse) => {
        return {
          ...event,
          id: response.id,
          starts_at: new Date(event.starts_at)
        }
      }))
  }

  getOrganizationEvents(): Observable<TimepadEvent[]> {

    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${timepadApi.apiKey}`)

    let params = new HttpParams()
      .set('organization_ids', `${timepadApi.organization.id}`)
      .set('fields', 'organization')

    return this.http.get(`${timepadApi.apiUrl}/events.json`, {
      headers: headers,
      params: params
    }).pipe(map((response: { [key: number]: any }) => {

      response['values'].map(item => {
        item.starts_at = new Date(item.starts_at)
      })

      return response['values']
    }))
  }

  getEventById(id: number): Observable<TimepadEvent> {

    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${timepadApi.apiKey}`)

    return this.http.get<TimepadEvent>(`${timepadApi.apiUrl}/events/${id}`, {
      headers: headers
    }).pipe(map((response: TimepadEvent) => {

      return response
    }))
  }

  updateEvent(event: TimepadEvent): Observable<TimepadEvent> {

    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${timepadApi.apiKey}`)

    return this.http.post<TimepadEvent>(`${timepadApi.apiUrl}/events/${event.id}`, event, {
      headers: headers
    })
  }
}
