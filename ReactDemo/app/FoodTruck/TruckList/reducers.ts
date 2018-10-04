import SortDirection from '@app/SortDirection';
import { head } from 'lodash';
import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';

import { IFetchTruckRequest, IPagedData } from '../api';
import { IFoodTruck } from '../types';
import * as actions from './actions';
import { TruckListAction } from './types';

const trucksLoadingReducer = (state = false, action: TruckListAction) =>
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

const selectedTruckIdReducer = (state: number | null = null, action: TruckListAction) =>
{
    switch (action.type)
    {
        case getType(actions.selectTruck):
            return action.payload;

        case getType(actions.fetchTrucks.success):
            return (head(action.payload.currentPage) || { id: null }).id;

        case getType(actions.fetchTrucks.failure):
            return null;

        default:
            return state;
    }
};

const defaultTruckRequest: IFetchTruckRequest = {
    searchTerm: '',
    sortName: 'name',
    sortDirection: SortDirection.Asc,
    page: 1,
    pageSize: 10,
};
const requestReducer = (state = defaultTruckRequest, action: TruckListAction) =>
{
    switch (action.type)
    {
        case getType(actions.setSort):
            return {
                ...state,
                ...action.payload,
                page: 1,
            };

        case getType(actions.setSearch):
            return {
                ...state,
                searchTerm: action.payload,
                page: 1,
            };

        case getType(actions.setPage):
            return {
                ...state,
                page: action.payload,
            };

        default:
            return state;
    }
};

const defaultTruckData: IPagedData<IFoodTruck> = {
    totalItems: 0,
    filteredItems: 0,
    currentPage: [],
};
const responseReducer = (state = defaultTruckData, action: TruckListAction) =>
{
    switch (action.type)
    {
        case getType(actions.fetchTrucks.success):
            return action.payload;

        case getType(actions.fetchTrucks.failure):
            return defaultTruckData;

        default:
            return state;
    }
};

const errorMessageReducer = (state = '', action: TruckListAction) =>
{
    switch (action.type)
    {
        case getType(actions.fetchTrucks.request):
            return '';

        case getType(actions.fetchTrucks.failure):
            return action.payload.message;

        default:
            return state;
    }
};

export const truckListReducer = combineReducers({
    isLoading: trucksLoadingReducer,
    selectedTruckId: selectedTruckIdReducer,
    request: requestReducer,
    response: responseReducer,
    errorMessage: errorMessageReducer,
});
