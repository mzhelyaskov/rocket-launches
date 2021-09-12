import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class HttpCancelService {

  private cancelPendingRequestsSubject$ = new Subject<void>();

  get cancelPendingRequests$() {
    return this.cancelPendingRequestsSubject$.asObservable();
  }

  public cancelPendingRequests() {
    this.cancelPendingRequestsSubject$.next();
  }
}
