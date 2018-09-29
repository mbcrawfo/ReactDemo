import * as actions from '@app/FoodTruck/actions';
import { IFoodTruck, IFoodTruckState, IPagedData, ITruckRequest } from '@app/FoodTruck/state';
import SortDirection from '@app/SortDirection';
import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

export type FoodTruckAction = ActionType<typeof actions>;

const trucksLoadingReducer = (state = false, action: FoodTruckAction) =>
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

const defaultTruckRequest: ITruckRequest = {
    searchTerm: '',
    sortName: 'name',
    sortDirection: SortDirection.Asc,
    page: 1,
    pageSize: 10,
};
const truckListRequestReducer = (state = defaultTruckRequest, action: FoodTruckAction) =>
{
    switch (action.type)
    {
        case getType(actions.setTruckSort):
            return {
                ...state,
                ...action.payload,
                page: 1,
            };

        case getType(actions.setTruckSearch):
            return {
                ...state,
                searchTerm: action.payload,
                page: 1,
            };

        case getType(actions.setTruckPage):
            return {
                ...state,
                page: action.payload,
            };

        default:
            return state;
    }
};

const selectedTruckIdReducer = (state: number | null = null, action: FoodTruckAction) =>
{
    switch (action.type)
    {
        case getType(actions.setSelectedTruck):
            return action.payload;

        default:
            return state;
    }
};

const defaultTruckData: IPagedData<IFoodTruck> = {
    totalItems: 0,
    filteredItems: 0,
    currentPage: [],
};
const truckDataReducer = (state = defaultTruckData, action: FoodTruckAction) =>
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

export const rootReducer = combineReducers<IFoodTruckState, FoodTruckAction>({
    truckList: combineReducers({
        isLoading: trucksLoadingReducer,
        request: truckListRequestReducer,
        selectedTruckId: selectedTruckIdReducer,
    }),

    data: combineReducers({
        trucks: truckDataReducer,
    }),
});
