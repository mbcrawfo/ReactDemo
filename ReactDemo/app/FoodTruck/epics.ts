import { combineEpics, Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, debounceTime, filter, map, switchMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import { FoodTruckApi } from './api';
import { TruckListAction } from './TruckList';
import * as actions from './TruckList/actions';
import { IFoodTruckAppState, RootAction } from './types';

export interface IEpicServices
{
    readonly api: FoodTruckApi;
}

const truckParamsEpic: Epic<TruckListAction, TruckListAction, IFoodTruckAppState> = (action$, state) =>
    action$.pipe(
        filter(isActionOf([actions.setSort, actions.setSearch, actions.setPage])),
        map(action => actions.fetchTrucks.request(state.value.truckList.request))
    );

const fetchTrucksEpic: Epic<RootAction, RootAction, IFoodTruckAppState, IEpicServices> =
    (action$, state, { api }) =>
        action$.pipe(
            filter(isActionOf(actions.fetchTrucks.request)),
            debounceTime(200),
            map(action => action.payload),
            switchMap(request =>
                from(api.fetchTrucks({...request})).pipe(
                    map(actions.fetchTrucks.success),
                    catchError(error => of(actions.fetchTrucks.failure(error)))
                )
            )
        );

export const rootEpic = combineEpics(
    truckParamsEpic,
    fetchTrucksEpic
);
