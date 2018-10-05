import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, debounceTime, filter, map, switchMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import { RootAction } from '../actions';
import { IEpicServices } from '../epics';
import { RootState } from '../reducers';
import { actions } from './actions';

const fetchTrucks: Epic<RootAction, RootAction, RootState, IEpicServices> =
    (action$, state$, { api }) =>
        action$.pipe(
            filter(isActionOf(actions.fetchTrucks.request)),
            debounceTime(250),
            map(action => action.payload),
            switchMap(request =>
                from(api.fetchTrucks(request)).pipe(
                    map(actions.fetchTrucks.success),
                    catchError(error => of(actions.fetchTrucks.failure(error)))
                )
            )
        );

const fetchTruckMenu: Epic<RootAction, RootAction, RootState, IEpicServices> =
    (action$, state$, { api }) =>
        action$.pipe(
            filter(isActionOf(actions.fetchTruckMenu.request)),
            map(action => action.payload),
            switchMap(foodTruckId =>
                from(api.fetchMenu(foodTruckId)).pipe(
                    map(menuItems => actions.fetchTruckMenu.success({ foodTruckId, menuItems })),
                    catchError(error => of(actions.fetchTruckMenu.failure(error)))
                )
            )
        );

export const entitiesEpics: ReadonlyArray<Epic> = [
    fetchTrucks,
    fetchTruckMenu,
];
