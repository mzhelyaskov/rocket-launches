import {EventData} from '@@shared/models/event-data';
import {Injectable} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class EventService {

  private subject$: Subject<EventData<any>>;

  constructor() {
    this.subject$ = new Subject<EventData<any>>();
  }

  emit(event: EventData<any>) {
    this.subject$.next(event);
  }

  on(eventName: string, action: (data: any) => void): Subscription {
    return this.subject$.pipe(
      filter((e: EventData<any>) => e.name === eventName),
      map((e: EventData<any>) => e.data)
    ).subscribe(action);
  }
}
