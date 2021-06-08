import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {EventsService} from "./events.service";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private eventsService: EventsService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log('[Intercepted Error]: ', error)
          if (error.status === 500) {
            this.router.navigate(['/admin', 'create'], {
              queryParams: {
                internalServerError: true
              }
            })
          } else if (error.status === 403) {
            this.router.navigate(['/admin', 'create'], {
              queryParams: {
                authorizationError: true
              }
            })
          }
          return throwError(error)
        })
      )
  }

}
