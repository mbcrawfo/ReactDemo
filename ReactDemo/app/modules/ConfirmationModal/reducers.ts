import { combineReducers } from 'redux';
import { getType, StateType } from 'typesafe-actions';

import { ConfirmationModalAction, confirmationModalActions } from './actions';
import { DefaultConfirmationModalData } from './types';

const show = (state = false, action: ConfirmationModalAction) =>
{
    switch (action.type)
    {
        case getType(confirmationModalActions.show):
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
        case getType(confirmationModalActions.show):
            return nextId++;

        case getType(confirmationModalActions.accept):
        case getType(confirmationModalActions.cancel):
            return 0;

        default:
            return state;
    }
};

const data = (state = DefaultConfirmationModalData, action: ConfirmationModalAction) =>
{
    switch (action.type)
    {
        case getType(confirmationModalActions.show):
            return action.payload;

        case getType(confirmationModalActions.accept):
        case getType(confirmationModalActions.cancel):
            return DefaultConfirmationModalData;

        default:
            return state;
    }
};

export const confirmationModalReducer = combineReducers({
    show,
    confirmationId,
    data,
});

export type ConfirmationModalState = StateType<typeof confirmationModalReducer>;
