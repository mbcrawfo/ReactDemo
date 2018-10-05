import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';

import { IFoodTruck, IFoodTruckMenuItem } from '../../models';
import { RootAction } from '../actions';
import { actions as entitiesActions } from '../entities';
import { actions } from './actions';

const truckReducer = (state: IFoodTruck | null = null, action: RootAction) =>
{
    switch (action.type)
    {
        case getType(actions.setTruck):
            return action.payload;

        default:
            return state;
    }
};

const menuLoadingReducer = (state = false, action: RootAction) =>
{
    switch (action.type)
    {
        case getType(entitiesActions.fetchTruckMenu.request):
            return true;

        case getType(entitiesActions.fetchTruckMenu.success):
        case getType(entitiesActions.fetchTruckMenu.failure):
            return false;

        default:
            return state;
    }
};

const menuReducer = (state: ReadonlyArray<IFoodTruckMenuItem> = [], action: RootAction) =>
{
    switch (action.type)
    {
        case getType(actions.setMenuItems):
            return action.payload;

        default:
            return state;
    }
};

export const truckDetailsReducer = combineReducers({
    truck: truckReducer,
    menuLoading: menuLoadingReducer,
    menu: menuReducer,
});
