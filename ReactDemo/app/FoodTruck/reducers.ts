import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';

import { TruckListActions, truckListReducer } from './TruckList';
import { IFoodTruck, IFoodTruckAppState, RootAction } from './types';

const foodTruckReducer = (state: ReadonlyArray<IFoodTruck> = [], action: RootAction) =>
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

export const rootReducer = combineReducers<IFoodTruckAppState, RootAction>({
    truckList: truckListReducer,
    data: combineReducers({
        foodTrucks: foodTruckReducer,
    }),
});
