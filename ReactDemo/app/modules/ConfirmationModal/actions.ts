import { AnyAction } from 'redux';
import { ActionType, createAction } from 'typesafe-actions';

import { IConfirmationModalData } from './types';

export const confirmationModalActions =
{
    show: createAction('confirmationModal/show',
        resolve => (data: IConfirmationModalData) => resolve(data)
    ),

    accept: createAction('confirmationModal/accept',
        resolve => (confirmationId: number, resultAction: AnyAction) => resolve({
            confirmationId,
            resultAction,
        })
    ),

    cancel: createAction('confirmationModal/cancel',
        resolve => (confirmationId: number, resultAction: AnyAction) => resolve({
            confirmationId,
            resultAction,
        })
    ),
};

export type ConfirmationModalAction = ActionType<typeof confirmationModalActions>;
