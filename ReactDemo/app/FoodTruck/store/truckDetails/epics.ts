import { Epic } from 'redux-observable';
import { iif, of } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import { RootAction } from '../actions';
import { actions as entitiesActions } from '../entities';
import { RootState } from '../reducers';
import { actions as trucksListActions } from '../trucksList';
import { actions } from './actions';

const setSelectedTruck: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(trucksListActions.select)),
        withLatestFrom(state$),
        map(([{ payload: foodTruckId }, state]) =>
        {
            const truck = foodTruckId === null ? null : state.entities.foodTrucks[foodTruckId];
            return actions.setTruck(truck);
        })
    );

const requestMenuIfNeeded: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(trucksListActions.select)),
        map(action => action.payload),
        withLatestFrom(state$),
        switchMap(([foodTruckId, state]) =>
            iif(() => foodTruckId === null,
                of(actions.setMenuItems([])),
                of(state.entities.foodTruckMenus[foodTruckId!]).pipe(
                    switchMap(cachedMenu =>
                        iif(() => cachedMenu !== undefined,
                            of(actions.setMenuItems(cachedMenu)),
                            of(entitiesActions.fetchTruckMenu.request(foodTruckId!))
                        )
                    )
                )
            )
        )
    );

const forwardMenuResponse: Epic<RootAction> = (action$) =>
    action$.pipe(
        filter(isActionOf(entitiesActions.fetchTruckMenu.success)),
        map(action => actions.setMenuItems(action.payload.menuItems))
    );

export const truckDetailsEpics: ReadonlyArray<Epic> = [
    setSelectedTruck,
    requestMenuIfNeeded,
    forwardMenuResponse,
];
