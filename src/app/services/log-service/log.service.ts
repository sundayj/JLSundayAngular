import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import {environment} from "../../../environments/environment";


@Injectable({ providedIn: 'root' })
export class LogService {
  [x: string]: any;
  public static readonly colors = {
    blue: '#2585d2',
    green: '#1bb100',
    red: '#ca2929',
  };
  public static readonly padding = '2px 4px';

  public static log(caller: string, toBeLogged: any): void {
    if (!environment.production) {
      const now = new Date();
      console.groupCollapsed(`${now.toLocaleTimeString()} | ${caller} says:`);
      console.log(toBeLogged);
      console.groupEnd();
    }
  }

  public static logHttpRequest(request: HttpRequest<any> | string): void {
    if (!environment.production) {
      if (request instanceof HttpRequest) {
        const now = new Date();

        let url: string;
        url = ((request as HttpRequest<any>).urlWithParams as string);
        url = this.cleanURLForLog(url);
        console.groupCollapsed(
          `%c${now.toLocaleTimeString()} [REQUEST] ${url}`,
          `background: ${LogService.colors.blue}; color: white; padding: ${LogService.padding};`
        );
        console.log(request.method);
        console.log(request.urlWithParams);
        if (request.body !== null) {
          console.log('Request body:');
          console.log(request.body);
        } else {
          console.log('%cNothing sent with the body of this request', 'font-style: italic;');
        }
      }
      console.groupEnd();
    }
  }

  public static logHttpResponse(response: HttpResponse<any> | string, duration: number, message?: string): void {
    if (!environment.production) {
      if (response instanceof HttpResponse) {
        const now = new Date();
        let url: string;

        url = response instanceof HttpResponse ? (response.url as string) : response;
        url = this.cleanURLForLog(url);
        console.groupCollapsed(
          `%c${now.toLocaleTimeString()} [RESPONSE] ${url}`,
          `background: ${LogService.colors.green}; color: white; padding: ${LogService.padding};`
        );
        console.log(response.url);
        console.log(response.status);
        if (response.body) {
          console.log('Response body:');
          if (JSON.stringify(response.body.length < 5000)) {
            console.log(response.body);
            if (message) {
              console.log(message);
            }
          }
        } else {
          console.log(response);
        }
        console.log(`${duration}ms`);
        console.groupEnd();
      }
    }
  }

  public static logHttpError(error: HttpErrorResponse): void {
    if (!environment.production) {
      const now = new Date();
      console.groupCollapsed(
        `%c${now.toLocaleTimeString()} [ERROR] ${error}`,
        `background: ${LogService.colors.red}; color: white; padding: ${LogService.padding};`
      );
      console.log(error);
      console.groupEnd();
    }
  }

  public static cleanURLForLog(url: string): string {
    // This next line is necessary when using the in-memory service, since
    // it doesn't return a url with the response.
    if (!url){return '';}
    url = url.includes('api') ? url.split('api')[1] : url;
    return url;
  }
}
