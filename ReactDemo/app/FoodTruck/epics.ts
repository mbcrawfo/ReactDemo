import { combineEpics, Epic } from 'redux-observable';
import { from, iif, of } from 'rxjs';
import { catchError, debounceTime, filter, flatMap, map, switchMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import { FoodTruckApi } from './api';
import { TruckDetailsActions } from './TruckDetails';
import { TruckListAction, TruckListActions } from './TruckList';
import { IFoodTruckAppState, RootAction } from './types';

export interface IEpicServices
{
    readonly api: FoodTruckApi;
}

const truckParamsEpic: Epic<TruckListAction, TruckListAction, IFoodTruckAppState> = (action$, state) =>
    action$.pipe(
        filter(isActionOf([
            TruckListActions.setSort,
            TruckListActions.setSearch,
            TruckListActions.setPage,
        ])),
        map(action => TruckListActions.fetchTrucks.request(state.value.truckList.request))
    );

const fetchTrucksEpic: Epic<RootAction, RootAction, IFoodTruckAppState, IEpicServices> =
    (action$, state, { api }) =>
        action$.pipe(
            filter(isActionOf(TruckListActions.fetchTrucks.request)),
            debounceTime(250),
            map(action => action.payload),
            switchMap(request =>
                from(api.fetchTrucks({...request})).pipe(
                    map(TruckListActions.fetchTrucks.success),
                    catchError(error => of(TruckListActions.fetchTrucks.failure(error)))
                )
            )
        );

const fetchTruckMenuIfNeededEpic: Epic<RootAction, RootAction, IFoodTruckAppState, IEpicServices> =
    (action$, state, { api }) =>
        action$.pipe(
            filter(isActionOf(TruckListActions.selectTruck)),
            filter(action => action.payload !== null),
            map(action => action.payload!),
            switchMap(foodTruckId =>
                iif(() => state.value.data.menuItems.has(foodTruckId),
                    of(TruckDetailsActions.setMenuData(state.value.data.menuItems.get(foodTruckId)!)),
                    from(api.fetchMenu(foodTruckId)).pipe(
                        flatMap(menuItems => [
                            TruckDetailsActions.fetchMenu.success({ foodTruckId, menuItems }),
                            TruckDetailsActions.setMenuData(menuItems),
                        ]),
                        catchError(error => of(TruckDetailsActions.fetchMenu.failure(error)))
                    )
                )
            )
        );

export const rootEpic = combineEpics(
    truckParamsEpic,
    fetchTrucksEpic,
    fetchTruckMenuIfNeededEpic
);
