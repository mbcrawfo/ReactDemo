import { cloneDeep } from 'lodash';
import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';

import { IFoodTruck, IFoodTruckMenuItem } from '../../models';
import { RootAction } from '../actions';
import { actions } from './actions';

interface IMap<T>
{
    readonly [key: number]: T;
}

type TruckMap = IMap<IFoodTruck>;
const foodTrucksReducer = (state: TruckMap = {}, action: RootAction) =>
{
    switch (action.type)
    {
        case getType(actions.fetchTrucks.success):
            const newItems: TruckMap = action.payload.currentPage
                .reduce((map, truck) =>
                {
                    map[truck.id] = truck;
                    return map;
                }, {} as any);
            return {
                ...cloneDeep(state),
                ...newItems,
            };

        default:
            return state;
    }
};

type MenuItemMap = IMap<ReadonlyArray<IFoodTruckMenuItem>>;
const foodTruckMenusReducer = (state: MenuItemMap = {}, action: RootAction) =>
{
    switch (action.type)
    {
        case getType(actions.fetchTruckMenu.success):
            return {
                ...cloneDeep(state),
                [action.payload.foodTruckId]: action.payload.menuItems,
            };

        default:
            return state;
    }
};

export const entitiesReducer = combineReducers({
    foodTrucks: foodTrucksReducer,
    foodTruckMenus: foodTruckMenusReducer,
});
