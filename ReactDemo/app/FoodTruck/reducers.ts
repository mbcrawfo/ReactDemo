import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';

import { TruckDetailsAction, TruckDetailsActions } from './TruckDetails';
import { TruckListAction, TruckListActions } from './TruckList';
import { truckListReducer } from './TruckList/reducers';
import { IFoodTruck, IFoodTruckMenuItem } from './types';

const foodTruckReducer = (state: ReadonlyArray<IFoodTruck> = [], action: TruckListAction) =>
{
    switch (action.type)
    {
        case getType(TruckListActions.fetchTrucks.success):
            return action.payload.currentPage;

        case getType(TruckListActions.fetchTrucks.failure):
            return [];

        default:
            return state;
    }
};

const defaultMenuItems: ReadonlyMap<number, ReadonlyArray<IFoodTruckMenuItem>> = new Map();
const menuItemsReducer = (state = defaultMenuItems, action: TruckDetailsAction) =>
{
    switch (action.type)
    {
        case getType(TruckDetailsActions.fetchMenu.success):
            return new Map(state).set(action.payload.foodTruckId, action.payload.menuItems);

        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    truckList: truckListReducer,
    data: combineReducers({
        foodTrucks: foodTruckReducer,
        menuItems: menuItemsReducer,
    }),
});
