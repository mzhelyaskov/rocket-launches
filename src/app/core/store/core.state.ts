import {CoreStateModel} from '@@shared/models/core-state-model';
import {Injectable} from '@angular/core';
import {RxState} from '@rx-angular/state';

const initialState: CoreStateModel = {
  dictionaries: {},
  exceptions: [],
  httpErrors: []
};

@Injectable({providedIn: 'root'})
export class CoreState extends RxState<CoreStateModel> {

  constructor() {
    super();
    this.reset();
  }

  get state() {
    return this.get();
  }

  patch(data: Partial<CoreStateModel>) {
    this.set({...this.state, ...data});
  }

  reset() {
    this.set(initialState);
  }
}
