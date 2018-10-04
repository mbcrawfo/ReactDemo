import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, debounceTime, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import { IEpicServices, RootAction, RootState } from '../..';
import { actions } from './actions';

const fetchTrucksOnRequestChange: Epic<RootAction, RootAction, RootState> =
    (action$, state$) =>
        action$.pipe(
            filter(isActionOf([
                actions.setSort,
                actions.setSearch,
                actions.setPage,
                actions.setPageSize,
            ])),
            withLatestFrom(state$),
            map(([, state]) => actions.fetch.request(state.foodTrucks.request))
        );

const fetchTrucks: Epic<RootAction, RootAction, RootState, IEpicServices> =
    (action$, state, { api }) =>
        action$.pipe(
            filter(isActionOf(actions.fetch.request)),
            debounceTime(250),
            map(action => action.payload),
            switchMap(request =>
                from(api.fetchTrucks({...request})).pipe(
                    map(actions.fetch.success),
                    catchError(error => of(actions.fetch.failure(error)))
                )
            )
        );

export const trucksEpics: ReadonlyArray<Epic> = [
    fetchTrucksOnRequestChange,
    fetchTrucks,
];
