import { head } from 'lodash';
import { Epic } from 'redux-observable';
import { filter, map, mapTo, withLatestFrom } from 'rxjs/operators';
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

const selectFirstTruckOnLoad: Epic<RootAction, RootAction> = (action$) =>
    action$.pipe(
        filter(isActionOf(entitiesActions.fetchTrucks.success)),
        map(action => (head(action.payload.currentPage) || { id: null }).id),
        map(actions.select)
    );

const clearSelectionOnFailure: Epic<RootAction, RootAction> = (action$) =>
    action$.pipe(
        filter(isActionOf(entitiesActions.fetchTrucks.failure)),
        mapTo(actions.select(null))
    );

export const trucksListEpics: ReadonlyArray<Epic> = [
    fetchTrucksOnRequestChange,
    selectFirstTruckOnLoad,
    clearSelectionOnFailure,
];
