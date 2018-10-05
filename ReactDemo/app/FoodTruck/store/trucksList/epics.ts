import { Epic } from 'redux-observable';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import { RootAction } from '../actions';
import { actions as entitiesActions } from '../entities';
import { RootState } from '../reducers';
import { actions } from './actions';

const fetchTrucksOnRequestChange: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf([
            actions.setSort,
            actions.setSearch,
            actions.setPage,
            actions.setPageSize,
        ])),
        withLatestFrom(state$),
        map(([, state]) => entitiesActions.fetchTrucks.request(state.trucksList.request))
    );

export const trucksListEpics: ReadonlyArray<Epic> = [
    fetchTrucksOnRequestChange,
];
