import { AnyAction } from 'redux';
import { getType, StateType } from 'typesafe-actions';

import { confirmationModalActions } from './actions';
import { IConfirmationModalData } from './types';

export const DefaultConfirmationModalData: IConfirmationModalData =
{
    title: '',
    text: '',
    acceptAction: { type: '' },
    cancelAction: { type: '' },
};

const defaultState =
{
    show: false,
    data: DefaultConfirmationModalData,
};

export const confirmationModalReducer = (state = defaultState, action: AnyAction): typeof defaultState =>
{
    const { type, payload } = action;

    if (getType(confirmationModalActions.show) === type)
    {
        return {
            show: true,
            data: payload! as IConfirmationModalData,
        };
    }

    const { data: { acceptAction, cancelAction } } = state;

    if (acceptAction.type === type || cancelAction.type === type)
    {
        return defaultState;
    }

    return state;
};

export type ConfirmationModalState = StateType<typeof confirmationModalReducer>;
