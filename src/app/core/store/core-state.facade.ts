import {CoreStateModel} from '@@shared/models/core-state-model';
import {ExceptionData} from '@@shared/models/exception-data.model';
import {HttpErrorData} from '@@shared/models/http-error-data.model';
import {CoreState} from '@@core/store/core.state';
import {DictEntry} from '@@shared/models/dict-entry';
import {Dictionaries} from '@@shared/models/dictionaries';
import {DictionaryName} from '@@shared/models/dictionary-name';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class CoreStateFacade {

  public state$: Observable<CoreStateModel> = this.coreState.select();

  constructor(private coreState: CoreState) {}

  setDictionaries(dictionaries: Dictionaries) {
    const state = this.coreState.state;
    this.coreState.patch({dictionaries: {...state.dictionaries, ...dictionaries}});
  }

  getDictionary$(dictionaryName: DictionaryName): Observable<DictEntry[]> {
    return this.coreState.select('dictionaries').pipe(map((dictionaries: Dictionaries) => {
      return (dictionaries || {})[dictionaryName];
    }));
  }

  getDictionary(dictionaryName: DictionaryName): DictEntry[] {
    const dictionaries = this.coreState.get('dictionaries');
    return (dictionaries || {})[dictionaryName];
  }

  setException(exceptionData: ExceptionData) {
    const state = this.coreState.state;
    this.coreState.patch({exceptions: [...state.exceptions, exceptionData]});
  }

  setHttpErrorData(httpErrorData: HttpErrorData) {
    const state = this.coreState.state;
    this.coreState.patch({httpErrors: [...state.httpErrors, httpErrorData]});
  }

  clearAll() {
    this.coreState.reset();
  }
}
