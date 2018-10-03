import SortDirection from '@app/SortDirection';
import { head } from 'lodash';
import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';

import { IFetchTruckRequest, IPagedData } from '../api';
import { IFoodTruck } from '../types';
import * as Actions from './actions';
import { ITruckListState, TruckListAction } from './types';

const trucksLoadingReducer = (state = false, action: TruckListAction) =>
{
    switch (action.type)
    {
        case getType(Actions.fetchTrucks.request):
            return true;

        case getType(Actions.fetchTrucks.success):
        case getType(Actions.fetchTrucks.failure):
            return false;

        default:
            return state;
    }
};

const selectedTruckIdReducer = (state: number | null = null, action: TruckListAction) =>
{
    switch (action.type)
    {
        case getType(Actions.setSelectedTruck):
            return action.payload;

        case getType(Actions.fetchTrucks.success):
            return (head(action.payload.currentPage) || { id: null }).id;

        case getType(Actions.fetchTrucks.failure):
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
        case getType(Actions.setTruckSort):
            return {
                ...state,
                ...action.payload,
                page: 1,
            };

        case getType(Actions.setTruckSearch):
            return {
                ...state,
                searchTerm: action.payload,
                page: 1,
            };

        case getType(Actions.setTruckPage):
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
        case getType(Actions.fetchTrucks.success):
            return action.payload;

        case getType(Actions.fetchTrucks.failure):
            return defaultTruckData;

        default:
            return state;
    }
};

const errorMessageReducer = (state = '', action: TruckListAction) =>
{
    switch (action.type)
    {
        case getType(Actions.fetchTrucks.request):
            return '';

        case getType(Actions.fetchTrucks.failure):
            return action.payload.message;

        default:
            return state;
    }
};

export const truckListReducer = combineReducers<ITruckListState, TruckListAction>({
    isLoading: trucksLoadingReducer,
    selectedTruckId: selectedTruckIdReducer,
    request: requestReducer,
    response: responseReducer,
    errorMessage: errorMessageReducer,
});
