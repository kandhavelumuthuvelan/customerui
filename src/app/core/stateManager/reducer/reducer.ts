import { Token } from './../../model/store';
import { ADD_TOKEN, DELETE_TOKEN } from './../action/action';
import { StoreModel } from '../../model/index';
import { Actions } from '../action/action';

import {environment} from '../../../../environments/environment.dev';

export function tokenReducer(
  state: Token = {
    key: localStorage.getItem(`${environment.localStorageName}token`)
  },
  action: Actions
) {
  switch (action.type) {
    case ADD_TOKEN:
      return  action.payload;

    case DELETE_TOKEN:
      return {key: ''};

    default:
      return state;
  }
}
