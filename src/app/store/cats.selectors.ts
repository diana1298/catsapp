
import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducers';
// import { CatsListState } from '../app.reducers';

// export const selectNotificationBrowser = (state: AppState) => state.notificationsBrowser;

export const selectCatsStore = (state: AppState) => state;

// export const selectNotificationBrowserNotifications = (state: AppState) => state.notificationsBrowser.notifications;

export const selectCats = createSelector(
  selectCatsStore,
  (state: any) => {
    const cats = state.catsStore;
    return cats;
  }
);

export const getSelectedCat = createSelector(
  selectCatsStore,
  (state: any) => {
    const cat = state.catStore.selectedCat;
    return cat;
  }
);

