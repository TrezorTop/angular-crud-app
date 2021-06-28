import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, from, Observable, of} from "rxjs";
import {TimepadEvent} from "../../environments/interface";
import {timepadApi} from "../../environments/environment";
import {find, tap} from "rxjs/operators";

const eventsState: TimepadEvent[] = [
  {
    id: 0,
    organization: {
      id: 0,
      subdomain: "test org"
    },
    starts_at: new Date(),
    name: "First Event",
    categories: [
      {
        id: "0",
        name: "category"
      }
    ],
    description_short: "description_short"
  },
  {
    id: 1,
    organization: {
      id: 0,
      subdomain: "test org"
    },
    starts_at: new Date(),
    name: "Second Event",
    categories: [
      {
        id: "0",
        name: "category"
      }
    ],
    description_short: "description_short"
  },
  {
    id: 2,
    organization: {
      id: 0,
      subdomain: "test org"
    },
    starts_at: new Date(),
    name: "Third Event",
    categories: [
      {
        id: "0",
        name: "category"
      }
    ],
    description_short: "description_short"
  }
]

@Injectable({providedIn: 'root'})
export class EventsService {
  constructor(private http: HttpClient) {
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${timepadApi.apiKey}`)
  }


  private _eventsState: BehaviorSubject<TimepadEvent[] | []> = new BehaviorSubject<TimepadEvent[] | []>([])
  public eventsState$: Observable<TimepadEvent[] | []> = this._eventsState.asObservable()


  postEvent(event: TimepadEvent): Observable<TimepadEvent> {

    return of(event).pipe(tap(event => {
      this._eventsState.next([...this._eventsState.getValue(), event])
    }))
  }

  getOrganizationEvents(): Observable<TimepadEvent[]> {

    return of(eventsState).pipe(tap(events => {
      this._eventsState.next([...this._eventsState.getValue(), ...events])
    }))
  }

  getEventById(id: number): Observable<TimepadEvent> {

    return from(eventsState).pipe(find(item => item.id === id))
  }

  updateEvent(event: TimepadEvent): Observable<TimepadEvent[]> {


    return of(eventsState).pipe(tap(events => {
      
    }))
  }
}
