import { AnyAction } from 'redux';
import { Epic } from 'redux-observable';
import { concat } from 'rxjs';
import { filter, map, mergeMap, take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import { confirmationModalActions } from './actions';
import { StateSelector } from './types';

const emitAcceptAction = <TRootState>(
    stateSelector: StateSelector,
    confirmationId: number
): Epic<AnyAction, AnyAction, TRootState> =>
    (action$, state$) =>
        action$.pipe(
            filter(isActionOf(confirmationModalActions.accept)),
            filter(action => action.payload === confirmationId),
            take(1),
            withLatestFrom(state$),
            map(([, state]) => stateSelector(state).data.acceptAction),
            takeUntil(
                action$.pipe(
                    filter(isActionOf(confirmationModalActions.cancel)),
                    filter(action => action.payload === confirmationId)
                )
            )
        );

const emitCancelAction = <TRootState>(
    stateSelector: StateSelector,
    confirmationId: number
): Epic<AnyAction, AnyAction, TRootState> =>
    (action$, state$) =>
        action$.pipe(
            filter(isActionOf(confirmationModalActions.cancel)),
            filter(action => action.payload === confirmationId),
            take(1),
            withLatestFrom(state$),
            map(([, state]) => stateSelector(state).data.cancelAction),
            takeUntil(
                action$.pipe(
                    filter(isActionOf(confirmationModalActions.accept)),
                    filter(action => action.payload === confirmationId)
                )
            )
        );

const emitActionsOnModalComplete = <TRootState>(stateSelector: StateSelector): Epic<AnyAction, AnyAction, TRootState> =>
    (action$, state$) =>
        action$.pipe(
            filter(isActionOf(confirmationModalActions.initiate)),
            withLatestFrom(state$),
            map(([, state]) => stateSelector(state).confirmationId),
            mergeMap(confirmationId =>
                concat(
                    emitAcceptAction<TRootState>(stateSelector, confirmationId)(action$, state$, undefined),
                    emitCancelAction<TRootState>(stateSelector, confirmationId)(action$, state$, undefined)
                )
            )
        );

export const makeConfirmationModalEpics = (stateSelector: StateSelector) => [
    emitActionsOnModalComplete(stateSelector),
];
