import { ActionType, createAction } from 'typesafe-actions';

import { IConfimationModalData } from './types';

export const confirmationModalActions =
{
    initiate: createAction('confirmationModal/initiate',
        resolve => (data: IConfimationModalData) => resolve(data)
    ),

    accept: createAction('confirmationModal/accept',
        resolve => (conirmationId: number) => resolve(conirmationId)
    ),

    cancel: createAction('confirmationModal/cancel',
        resolve => (confirmationId: number) => resolve(confirmationId)
    ),
};

export type ConfirmationModalAction = ActionType<typeof confirmationModalActions>;
