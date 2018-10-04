import SortDirection from '@app/SortDirection';
import { head } from 'lodash';
import { combineReducers } from 'redux';
import { getType, StateType } from 'typesafe-actions';

import { IFetchTruckRequest, IPagedData } from '../../api';
import { IFoodTruck } from '../../models';
import { actions, TrucksAction } from './actions';

const loadingReducer = (state = false, action: TrucksAction) =>
{
    switch (action.type)
    {
        case getType(actions.fetch.request):
            return true;

        case getType(actions.fetch.success):
        case getType(actions.fetch.failure):
            return false;

        default:
            return state;
    }
};

const selectedTruckIdReducer = (state: number | null = null, action: TrucksAction) =>
{
    switch (action.type)
    {
        case getType(actions.select):
            return action.payload;

        case getType(actions.fetch.success):
            return (head(action.payload.currentPage) || { id: null }).id;

        case getType(actions.fetch.failure):
            return null;

        default:
            return state;
    }
};

const defaultTruckRequest: IFetchTruckRequest = {
    searchTerm: '',
    sortDirection: SortDirection.Asc,
    sortName: 'name',
    page: 1,
    pageSize: 10,
};
const requestReducer = (state = defaultTruckRequest, action: TrucksAction) =>
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

        case getType(actions.setPageSize):
            return {
                ...state,
                pageSize: action.payload,
            };

        default:
            return state;
    }
};

const defaultResponse: IPagedData<IFoodTruck> = {
    totalItems: 0,
    filteredItems: 0,
    currentPage: [],
};
const responseReducer = (state = defaultResponse, action: TrucksAction) =>
{
    switch (action.type)
    {
        case getType(actions.fetch.success):
            return action.payload;

        case getType(actions.fetch.failure):
            return defaultResponse;

        default:
            return state;
    }
};

export const trucksReducer = combineReducers({
    loading: loadingReducer,
    selectedTruckId: selectedTruckIdReducer,
    request: requestReducer,
    response: responseReducer,
});

export type TrucksState = StateType<typeof trucksReducer>;
