import { Epic } from 'redux-observable';
import { from, iif, of } from 'rxjs';
import { catchError, debounceTime, filter, flatMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import { RootAction } from '../actions';
import { IEpicServices } from '../epics';
import { RootState } from '../reducers';
import { actions as trucksListActions } from '../trucksList';
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

const fetchTruckMenuIfNeeded: Epic<RootAction, RootAction, RootState, IEpicServices> =
    (action$, state$, { api }) =>
        action$.pipe(
            filter(isActionOf(trucksListActions.select)),
            filter(action => action.payload !== null),
            withLatestFrom(state$),
            map(([action, state]) => ({
                foodTruckId: action.payload!,
                cachedMenu: state.entities.foodTruckMenus[action.payload!],
            })),
            switchMap(({ foodTruckId, cachedMenu }) =>
                iif(() => cachedMenu !== undefined,
                    of(actions.fetchTruckMenu.success({ foodTruckId, menuItems: cachedMenu })),
                    from(api.fetchMenu(foodTruckId)).pipe(
                        flatMap(menuItems => [
                            actions.fetchTruckMenu.success({ foodTruckId, menuItems }),
                        ]),
                        catchError(error => of(actions.fetchTruckMenu.failure(error)))
                    )
                )
            )
        );

export const entitiesEpics: ReadonlyArray<Epic> = [
    fetchTrucks,
    fetchTruckMenuIfNeeded,
];
