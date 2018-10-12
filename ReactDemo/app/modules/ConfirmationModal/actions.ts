import { ActionType, createAction } from 'typesafe-actions';

import { IConfirmationModalData } from './types';

export const confirmationModalActions =
{
    show: createAction('confirmationModal/show',
        resolve => (data: IConfirmationModalData) => resolve(data)
    ),
};

export type ConfirmationModalAction = ActionType<typeof confirmationModalActions>;
