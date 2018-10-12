import { AnyAction } from 'redux';
import { ActionType, createAction } from 'typesafe-actions';

import { IConfimationModalData } from './types';

export const confirmationModalActions =
{
    show: createAction('confirmationModal/show',
        resolve => (data: IConfimationModalData) => resolve(data)
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
