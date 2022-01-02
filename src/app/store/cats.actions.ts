import { Cat } from "../cat.model";
import { createAction, props } from '@ngrx/store';
import * as _ from 'lodash';

export const GET_CATS = 'GET_CATS';
export const SET_CATS = 'SET_CATS';
export const ADD_CAT = 'ADD_CAT';
export const UPDATE_CAT = 'UPDATE_CAT';
export const DELETE_CAT = 'DELETE_CAT';
export const SET_SELECTED_CAT = 'SET_SELECTED_CAT';
export const CREATE_ERROR = 'Create Error';
export const DELETE_ERROR = 'Delete Error';

export const GetCats = createAction(GET_CATS);

export const SetCats = createAction(SET_CATS, props<{ cats: Cat[]}>());

export const AddCat = createAction(ADD_CAT, props<{ cat: Cat, callback?: () => void }>());

export const UpdateCat = createAction(UPDATE_CAT, props<{ cat: Cat, callback?: () => void }>());

export const SetSelectedCat = createAction(SET_SELECTED_CAT, props<{ cat: Cat }>());



export const CreateError = createAction(CREATE_ERROR, props<{ error: any }>());
export const DeleteError = createAction(DELETE_ERROR, props<{ error: string }>());
