import { combineReducers } from 'redux';
import { getType, StateType } from 'typesafe-actions';

import { ConfirmationModalAction, confirmationModalActions } from './actions';
import { IConfimationModalData } from './types';

const showModal = (state = false, action: ConfirmationModalAction) =>
{
    switch (action.type)
    {
        case getType(confirmationModalActions.initiate):
            return true;

        case getType(confirmationModalActions.accept):
        case getType(confirmationModalActions.cancel):
            return false;

        default:
            return state;
    }
};

// should probably be guid or something
let nextId = 1;
const confirmationId = (state = 0, action: ConfirmationModalAction) =>
{
    switch (action.type)
    {
        case getType(confirmationModalActions.initiate):
            return nextId++;

        case getType(confirmationModalActions.accept):
        case getType(confirmationModalActions.cancel):
            return 0;

        default:
            return state;
    }
};

const defaultData: IConfimationModalData =
{
    title: '',
    text: '',
    acceptAction: { type: '' },
    cancelAction: { type: '' },
};
const data = (state = defaultData, action: ConfirmationModalAction) =>
{
    switch (action.type)
    {
        case getType(confirmationModalActions.initiate):
            return action.payload;

        case getType(confirmationModalActions.accept):
        case getType(confirmationModalActions.cancel):
            return defaultData;

        default:
            return state;
    }
};

export const confirmationModalReducer = combineReducers({
    showModal,
    confirmationId,
    data,
});

export type ConfirmationModalState = StateType<typeof confirmationModalReducer>;
