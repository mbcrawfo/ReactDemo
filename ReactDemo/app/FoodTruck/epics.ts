import { Epic, combineEpics } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { from, of } from 'rxjs';
import { filter, switchMap, map, catchError, flatMap, debounceTime } from 'rxjs/operators';
import { head } from 'lodash';

import { IFoodTruckState } from '@app/FoodTruck/state';
import * as actions from '@app/FoodTruck/actions';
import { FoodTruckApi } from '@app/FoodTruck/api';
import { FoodTruckAction } from '@app/FoodTruck/reducers';

export interface IEpicServices
{
    readonly api: FoodTruckApi;
}

const truckParamsEpic: Epic<FoodTruckAction, FoodTruckAction, IFoodTruckState> = (action$, state) =>
    action$.pipe(
        filter(isActionOf([actions.setTruckSort, actions.setTruckSearch])),
        map(action => actions.fetchTrucks.request(state.value.truckList.request))
    );

const fetchTrucksEpic: Epic<FoodTruckAction, FoodTruckAction, IFoodTruckState, IEpicServices> =
    (action$, state, { api }) =>
        action$.pipe(
            filter(isActionOf(actions.fetchTrucks.request)),
            debounceTime(200),
            map(action => action.payload),
            switchMap(request =>
                from(api.fetchTrucks({...request})).pipe(
                    flatMap(data => [
                        actions.fetchTrucks.success(data),
                        actions.setSelectedTruck(
                            (head(data.currentPage) || { id: null }).id),
                    ]),
                    catchError(error => of(actions.fetchTrucks.failure(error as Response)))
                )
            )
        );

export const rootEpic = combineEpics(
    truckParamsEpic,
    fetchTrucksEpic
);
