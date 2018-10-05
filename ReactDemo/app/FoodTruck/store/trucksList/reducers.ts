import SortDirection from '@app/SortDirection';
import { head } from 'lodash';
import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';

import { IFetchTruckRequest, IPagedData } from '../../api';
import { IFoodTruck } from '../../models';
import { RootAction } from '../actions';
import { actions as entitiesActions } from '../entities';
import { actions } from './actions';

const loadingReducer = (state = false, action: RootAction) =>
{
    switch (action.type)
    {
        case getType(entitiesActions.fetchTrucks.request):
            return true;

        case getType(entitiesActions.fetchTrucks.success):
        case getType(entitiesActions.fetchTrucks.failure):
            return false;

        default:
            return state;
    }
};

const selectedTruckIdReducer = (state: number | null = null, action: RootAction) =>
{
    switch (action.type)
    {
        case getType(actions.select):
            return action.payload;

        case getType(entitiesActions.fetchTrucks.success):
            return (head(action.payload.currentPage) || { id: null }).id;

        default:
            return state;
    }
};

const defaultkRequest: IFetchTruckRequest = {
    searchTerm: '',
    sortDirection: SortDirection.Asc,
    sortName: 'name',
    page: 1,
    pageSize: 10,
};
const requestReducer = (state = defaultkRequest, action: RootAction) =>
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
const responseReducer = (state = defaultResponse, action: RootAction) =>
{
    switch (action.type)
    {
        case getType(entitiesActions.fetchTrucks.success):
            return action.payload;

        case getType(entitiesActions.fetchTrucks.failure):
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
