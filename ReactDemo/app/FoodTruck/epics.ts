import * as actions from '@app/FoodTruck/actions';
import { FoodTruckApi } from '@app/FoodTruck/api';
import { FoodTruckAction } from '@app/FoodTruck/reducers';
import { IFoodTruckState } from '@app/FoodTruck/state';
import { head } from 'lodash';
import { combineEpics, Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, debounceTime, filter, flatMap, map, switchMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

export interface IEpicServices
{
    readonly api: FoodTruckApi;
}

const truckParamsEpic: Epic<FoodTruckAction, FoodTruckAction, IFoodTruckState> = (action$, state) =>
    action$.pipe(
        filter(isActionOf([actions.setTruckSort, actions.setTruckSearch, actions.setTruckPage])),
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
