import { TestBed } from '@angular/core/testing';

import { TOHHTTPInterceptor } from './http-interceptor.interceptor';

describe('TOHHTTPInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TOHHTTPInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TOHHTTPInterceptor = TestBed.inject(TOHHTTPInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
