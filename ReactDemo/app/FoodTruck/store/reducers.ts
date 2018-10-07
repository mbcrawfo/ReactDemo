import SortDirection from '@app/SortDirection';
import { head } from 'lodash';
import { combineReducers } from 'redux';
import { getType, StateType } from 'typesafe-actions';

import { IFetchTruckRequest } from '../api';
import { IFoodTruck, IFoodTruckMenuItem } from '../models';
import { actions, RootAction } from './actions';

interface IMap<T>
{
    readonly [key: number]: T;
}

type TruckMap = IMap<IFoodTruck>;
const trucks = (state: TruckMap = {}, action: RootAction) =>
{
    switch (action.type)
    {
        case getType(actions.fetchTrucks.success):
            // replace the existing map, since we never need trucks that aren't on the current page
            return action.payload.currentPage.reduce((map, truck) =>
                {
                    map[truck.id] = truck;
                    return map;
                }, {} as any) as TruckMap;

        default:
            return state;
    }
};

type MenuItemMap = IMap<ReadonlyArray<IFoodTruckMenuItem>>;
const truckMenus = (state: MenuItemMap = {}, action: RootAction) =>
{
    switch (action.type)
    {
        case getType(actions.fetchTruckMenu.success):
            return {
                ...state,
                [action.payload.foodTruckId]: action.payload.menuItems,
            };

        default:
            return state;
    }
};

const trucksLoading = (state = false, action: RootAction) =>
{
    switch (action.type)
    {
        case getType(actions.fetchTrucks.request):
            return true;

        case getType(actions.fetchTrucks.success):
        case getType(actions.fetchTrucks.failure):
            return false;

        default:
            return state;
    }
};

const truckMenusLoading = (state = false, action: RootAction) =>
{
    switch (action.type)
    {
        case getType(actions.fetchTruckMenu.request):
            return true;

        case getType(actions.fetchTruckMenu.success):
        case getType(actions.fetchTruckMenu.failure):
            return false;

        default:
            return state;
    }
};

const defaultRequest: IFetchTruckRequest = {
    searchTerm: '',
    sortDirection: SortDirection.Asc,
    sortName: 'name',
    page: 1,
    pageSize: 10,
};
const truckRequestParams = (state = defaultRequest, action: RootAction) =>
{
    switch (action.type)
    {
        case getType(actions.searchTrucks):
            return {
                ...state,
                searchTerm: action.payload,
                page: 1,
            };

        case getType(actions.sortTrucks):
            return {
                ...state,
                ...action.payload,
                page: 1,
            };

        case getType(actions.setTruckPage):
            return {
                ...state,
                page: action.payload,
            };

        case getType(actions.setTruckPageSize):
            return {
                ...state,
                pageSize: action.payload,
            };

        default:
            return state;
    }
};

const defaultTruckPaging =
{
    sortedTruckIds: [] as ReadonlyArray<number>,
    trucksMatchingSearch: 0,
    totalTrucks: 0,
};
const truckPaging = (state = defaultTruckPaging, action: RootAction) =>
{
    switch (action.type)
    {
        case getType(actions.fetchTrucks.success):
            const { currentPage, filteredItems, totalItems } = action.payload;
            return {
                sortedTruckIds: currentPage.map(truck => truck.id),
                trucksMatchingSearch: filteredItems,
                totalTrucks: totalItems,
            };

        case getType(actions.fetchTrucks.failure):
            return defaultTruckPaging;

        default:
            return state;
    }
};

const selectedTruckId = (state: number | null = null, action: RootAction) =>
{
    switch (action.type)
    {
        case getType(actions.selectTruck):
            return action.payload;

        // select first truck on page load
        case getType(actions.fetchTrucks.success):
            const { currentPage } = action.payload;
            if (currentPage.length === 0)
            {
                return null;
            }
            return head(currentPage)!.id;

        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    entities: combineReducers({
        trucks,
        truckMenus,
    }),
    trucksLoading,
    truckMenusLoading,
    truckRequestParams,
    truckPaging,
    selectedTruckId,
});

export type RootState = StateType<typeof rootReducer>;
