import { AnyAction } from 'redux';
import { Epic } from 'redux-observable';
import { merge } from 'rxjs';
import { filter, map, mergeMap, take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import { confirmationModalActions } from './actions';
import { StateSelector } from './types';

const emitAcceptAction = (targetId: number): Epic<AnyAction, AnyAction> =>
    (action$) =>
        action$.pipe(
            filter(isActionOf(confirmationModalActions.accept)),
            map(action => action.payload),
            filter(({ confirmationId }) => confirmationId === targetId),
            take(1),
            map(({ resultAction }) => resultAction),
            takeUntil(
                action$.pipe(
                    filter(isActionOf(confirmationModalActions.cancel)),
                    map(action => action.payload.confirmationId),
                    filter(confirmationId => confirmationId === targetId)
                )
            )
        );

const emitCancelAction = (targetId: number): Epic<AnyAction, AnyAction> =>
    action$ =>
        action$.pipe(
            filter(isActionOf(confirmationModalActions.cancel)),
            map(action => action.payload),
            filter(({ confirmationId }) => confirmationId === targetId),
            take(1),
            map(({ resultAction }) => resultAction),
            takeUntil(
                action$.pipe(
                    filter(isActionOf(confirmationModalActions.accept)),
                    map(action => action.payload.confirmationId),
                    filter(confirmationId => confirmationId === targetId)
                )
            )
        );

const emitActionsOnModalComplete = <TRootState>(
    stateSelector: StateSelector<TRootState>
): Epic<AnyAction, AnyAction, TRootState> =>
    (action$, state$) =>
        action$.pipe(
            filter(isActionOf(confirmationModalActions.show)),
            withLatestFrom(state$),
            map(([, state]) => stateSelector(state).confirmationId),
            mergeMap(confirmationId =>
                merge(
                    emitAcceptAction(confirmationId)(action$, state$, undefined),
                    emitCancelAction(confirmationId)(action$, state$, undefined)
                )
            )
        );

export const makeConfirmationModalEpics = <TRootState>(stateSelector: StateSelector<TRootState>) => [
    emitActionsOnModalComplete(stateSelector),
];
