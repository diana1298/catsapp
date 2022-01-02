export * from './cats.actions';
export * from './cats.reducer';
// export * from './cats.selectors';

import * as actions from './cats.actions';
import { catsListReducer, initialState } from './cats.reducer';
// import * as selectors from './cats.selectors';
// import { CatEffects } from './cats.effects';
// import { CatsState } from '../model/layout.model';
export {
  // CatsState,
  actions,
  initialState,
  catsListReducer,
  // selectors,
  // CatEffects,
};
