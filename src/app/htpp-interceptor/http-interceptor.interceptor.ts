import {Injectable} from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {LogService} from "../services/log-service/log.service";
import {finalize, tap} from "rxjs/operators";

@Injectable()
export class TOHHTTPInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // If we wanted to add Auth headers, or change anything within a response, this
    // would be the place to do it.
    const clonedRequest = req.clone({
      responseType: "json",
      setHeaders: {}
    });

    const start = Date.now();
    let ok: string;
    let res: HttpResponse<any>;
    let errorResponse: HttpErrorResponse;

    LogService.logHttpRequest(clonedRequest);

    return next.handle(clonedRequest).pipe(
      tap(
        event => {
          // Succeeds when there is a response; ignore other events
          if (event instanceof HttpResponse) {
            ok = "succeeded";
            res = event;
          }
        },
        // Operation failed; error is an HttpErrorResponse
        error => {
          ok = "failed";
          errorResponse = error;
        }
      ),
      // Log when response observable either completes or errors
      finalize(() => {
        const elapsed = Date.now() - start;
        const msg = `${req.method} "${req.urlWithParams}"
                        ${ok} in ${elapsed} ms.`;
        LogService.logHttpRequest(msg);
        if (ok == "failed") {
          LogService.logHttpError(errorResponse);
          return of(errorResponse);
        }
        LogService.logHttpResponse(res, elapsed, msg);

        return of(res);
      })
    );
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TOHHTTPInterceptor, multi: true }
];
