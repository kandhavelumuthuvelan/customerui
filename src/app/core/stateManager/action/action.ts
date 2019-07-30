import { Token } from './../../model/store';
import { Action } from '@ngrx/store';

export const ADD_TOKEN = 'Add_Token_Create';
export const DELETE_TOKEN = 'Delete_Token_Delete';

export class AddToken implements Action {
  readonly type = ADD_TOKEN;

  constructor(public payload: Token) {}
}

export class DeleteToken implements Action {
  readonly type = DELETE_TOKEN;

  constructor() {}
}

export type Actions =  AddToken|DeleteToken;
