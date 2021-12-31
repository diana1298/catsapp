import { ActionReducerMap } from '@ngrx/store';
import * as catsList from './store';

const CATS_STORE = 'catsStore';
const CAT_STORE = 'catStore';

export interface AppState {
  [CATS_STORE]: catsList.State;
  [CAT_STORE]: catsList.CatState;
}

export const reducers: ActionReducerMap<AppState> = {
  [CATS_STORE]: catsList.catsListReducer,
  [CAT_STORE]: catsList.selectedCatReducer
};
