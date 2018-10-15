import { combineReducers } from 'redux';
import { getType, StateType } from 'typesafe-actions';

import { TruckEditorAction, truckEditorActions } from './actions';

const show = (state = false, action: TruckEditorAction) =>
{
    switch (action.type)
    {
        case getType(truckEditorActions.show):
            return true;

        case getType(truckEditorActions.cancel):
            return false;

        default:
            return state;
    }
};

const truckId = (state: number | null = null, action: TruckEditorAction) =>
{
    switch (action.type)
    {
        case getType(truckEditorActions.show):
            return action.payload;

        case getType(truckEditorActions.cancel):
            return null;

        default:
            return state;
    }
};

export const truckEditorReducer = combineReducers({
    show,
    truckId,
});

export type TruckEditorState = StateType<typeof truckEditorReducer>;
