import { head } from 'lodash';
import { combineEpics, Epic } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { auditTime, catchError, filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import { FoodTruckApi } from '../api';
import { actions, RootAction } from './actions';
import { RootState } from './reducers';
import { getSelectedTruckMenu } from './selectors';

export interface IEpicServices
{
    readonly api: FoodTruckApi;
}

const fetchTrucks: Epic<RootAction, RootAction, RootState, IEpicServices> = (action$, state$, { api }) =>
    action$.pipe(
        filter(isActionOf(actions.fetchTrucks.request)),
        auditTime(300),
        map(action => action.payload),
        switchMap(request =>
            from(api.fetchTrucks(request)).pipe(
                mergeMap(response =>
                {
                    const { currentPage } = response;
                    const firstTruckId = (head(currentPage) || { id: null }).id;
                    return concat(
                        of(actions.fetchTrucks.success(response)),
                        of(actions.selectTruck(firstTruckId))
                    );
                }),
                catchError(map(actions.fetchTrucks.failure))
            )
        )
    );

const fetchTruckMenu: Epic<RootAction, RootAction, RootState, IEpicServices> = (action$, state$, { api }) =>
    action$.pipe(
        filter(isActionOf(actions.fetchTruckMenu.request)),
        map(action => action.payload),
        switchMap(truckId =>
            from(api.fetchMenu(truckId)).pipe(
                map(menuItems => ({ foodTruckId: truckId, menuItems })),
                map(actions.fetchTruckMenu.success),
                catchError(map(actions.fetchTruckMenu.failure))
            )
        )
    );

const fetchTrucksOnRequestParamsChange: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf([
            actions.searchTrucks,
            actions.sortTrucks,
            actions.setTruckPage,
            actions.setTruckPageSize,
        ])),
        withLatestFrom(state$),
        map(([, state]) => state.truckRequestParams),
        map(actions.fetchTrucks.request)
    );

const fetchTruckMenuIfNeeded: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(actions.selectTruck)),
        filter(action => action.payload !== null),
        map(action => action.payload!),
        withLatestFrom(state$),
        filter(([, state]) => getSelectedTruckMenu(state) === null),
        map(([truckId]) => truckId),
        map(actions.fetchTruckMenu.request)
    );

export const rootEpic = combineEpics(
    fetchTrucks,
    fetchTruckMenu,
    fetchTrucksOnRequestParamsChange,
    fetchTruckMenuIfNeeded
);
