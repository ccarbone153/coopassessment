import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpResponse, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export default class MyHttpInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {  
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          let newEvent: HttpEvent<any>;
          newEvent = event.clone({
            body: event.body.data || event.body
          });
          newEvent.body.HttpInterceptor = "DummyInterceptor";
          return newEvent;
        }
      })
  );
}
}