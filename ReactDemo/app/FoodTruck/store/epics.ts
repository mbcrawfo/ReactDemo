import { head } from 'lodash';
import { combineEpics, Epic } from 'redux-observable';
import { concat, empty, from, iif, of } from 'rxjs';
import {
    auditTime,
    catchError,
    filter,
    map,
    mapTo,
    mergeMap,
    startWith,
    switchMap,
    take,
    takeUntil,
    withLatestFrom,
} from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import { confirmationModalActions } from '../../modules/ConfirmationModal';
import { FoodTruckApi } from '../api';
import { actions, RootAction } from './actions';
import { RootState } from './reducers';
import { getDeleteConfirmationModalData, getSelectedTruckMenu, getSelectedTruckSchedule } from './selectors';

export interface IEpicServices
{
    readonly api: FoodTruckApi;
}

const fetchTrucks: Epic<RootAction, RootAction, RootState, IEpicServices> = (action$, state$, { api }) =>
    action$.pipe(
        filter(isActionOf(actions.fetchTrucks.request)),
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
            from(api.fetchTruckMenu(truckId)).pipe(
                map(items => ({ foodTruckId: truckId, items })),
                map(actions.fetchTruckMenu.success),
                catchError(map(actions.fetchTruckMenu.failure))
            )
        )
    );

const fetchTruckSchedule: Epic<RootAction, RootAction, RootState, IEpicServices> = (action$, state$, { api }) =>
    action$.pipe(
        filter(isActionOf(actions.fetchTruckSchedule.request)),
        map(action => action.payload),
        switchMap(truckId =>
            from(api.fetchTruckSchedule(truckId)).pipe(
                map(items => ({ foodTruckId: truckId, items })),
                map(actions.fetchTruckSchedule.success),
                catchError(map(actions.fetchTruckSchedule.failure))
            )
        )
    );

const triggerFetchTrucks: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf([
            actions.searchTrucks,
            actions.sortTrucks,
            actions.setTruckPage,
            actions.setTruckPageSize,
            actions.deleteTruck.commit.success,
        ])),
        auditTime(300),
        withLatestFrom(state$),
        map(([, state]) => state.truckRequestParams),
        map(actions.fetchTrucks.request)
    );

const triggerTruckDetailsFetch: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(actions.selectTruck)),
        filter(action => action.payload !== null),
        map(action => action.payload!),
        withLatestFrom(state$),
        mergeMap(([truckId, state]) =>
            concat(
                iif(() => getSelectedTruckMenu(state) === null,
                    of(actions.fetchTruckMenu.request(truckId)),
                    empty()
                ),
                iif(() => getSelectedTruckSchedule(state) === null,
                    of(actions.fetchTruckSchedule.request(truckId)),
                    empty()
                )
            )
        )
    );

const deleteTruckWhenConfirmed: Epic<RootAction, RootAction, RootState, IEpicServices> = (action$, state$, { api }) =>
    action$.pipe(
        filter(isActionOf(actions.deleteTruck.begin)),
        withLatestFrom(state$),
        map(([action, state]) => ({
            truckId: action.payload,
            modalData: getDeleteConfirmationModalData(state),
        })),
        mergeMap(({ truckId, modalData }) =>
            // subscribe to wait for the confirmation result
            action$.pipe(
                filter(isActionOf(actions.deleteTruck.confirm)),
                // possibly redundant sanity checking?
                filter(action => action.payload === truckId),
                // complete observable after confirmation
                take(1),
                switchMap(() =>
                    concat(
                        // notify of the pending request
                        of(actions.deleteTruck.commit.request(truckId)),
                        // make request
                        from(api.deleteTruck(truckId)).pipe(
                            mapTo(actions.deleteTruck.commit.success(truckId)),
                            catchError(error => of(actions.deleteTruck.commit.failure(error)))
                        )
                    )
                ),
                // complete observable on confirmation cancel
                takeUntil(
                    action$.pipe(
                        filter(isActionOf(actions.deleteTruck.cancel)),
                        filter(action => action.payload === truckId)
                    )
                ),
                // trigger the modal
                startWith(confirmationModalActions.show(modalData))
            )
        )
    );

export const rootEpic = combineEpics(
    fetchTrucks,
    fetchTruckMenu,
    fetchTruckSchedule,
    triggerFetchTrucks,
    triggerTruckDetailsFetch,
    deleteTruckWhenConfirmed
);
