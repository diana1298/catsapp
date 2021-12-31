import * as CatActions from './cats.actions'
import { Cat } from "../cat.model";
import { createReducer, on } from '@ngrx/store';
import * as _ from 'lodash';
import {AppState} from "../app.reducers";

export interface State {
  catsList: {
    cats: Cat[],
    catCount: number;
  }
}

export interface CatState {
  selectedCat: Cat
}

export const initialState: State = {
  catsList: {
    cats: [
    ],
    catCount: 0
  },

};

export const initialCatState: CatState = {
  selectedCat: {"id":"J9Euy8rHW0bM3TUXOmMk",
    "name":"Mr. Ash",
    "colors":["Grey", "Yellow", "Brown"],
    "gender":"Male",
    "likes":"Humping",
    "imgPath":"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
    "age":3
  }
};

export const catsListReducer = createReducer(
  initialState,
  on(CatActions.AddCat, (state: any, action) => {
    const updatedCats = [
      ...state.catsList.cats,
      action.cat
    ];
    return _.setWith(_.clone(state), 'cats', updatedCats, _.clone);
    })
  ,
  on(CatActions.SetCats, (state, action) => {
    const updatedCats = {
      cats: [
        ...action.cats
      ],
      catCount: action.cats.length
  };

    return _.setWith(_.clone(state), 'catsList', updatedCats, _.clone);

    // return _.clone(state);
    // return _.setWith(_.clone(state), 'cats', cats, _.clone);
  }),

  on(CatActions.UpdateCat, (state, action) => {
    const updatedCats = [...state.catsList.cats];

    // for(var i in state.cats) {
    //   console.log(state.cats[i].id , action.cat.id)
    //   if(state.cats[i].id === action.cat.id) {
    //     console.log('found')
    //     const cat = state.cats[i];
    //   }
    // }

    // return _.clone(state);
    return _.setWith(_.clone(state), 'cats', updatedCats, _.clone);
  }),
);

export const selectedCatReducer = createReducer(
  initialCatState,
  on(CatActions.SetSelectedCat, (state: any, action: any) => {
    const cloneState: CatState = _.cloneDeep(state);
    const newState = {
      ...cloneState,
      selectedCat: action.cat
    };
    return newState;
  }),

);
