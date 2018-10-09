import SortDirection from '@app/SortDirection';
import { AxiosError } from 'axios';
import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';

import { IFetchTruckRequest, IPagedData } from '../api';
import { IFoodTruck, IFoodTruckMenuItem, IFoodTruckScheduleEntry } from '../models';

interface ITruckPropertiesResult<T>
{
    readonly foodTruckId: number;
    readonly items: ReadonlyArray<T>;
}

export const actions =
{
    fetchTrucks: createAsyncAction(
        'fetchTrucks/request',
        'fetchTrucks/success',
        'fetchTrucks/failure'
    )<IFetchTruckRequest, IPagedData<IFoodTruck>, AxiosError>(),

    fetchTruckMenu: createAsyncAction(
        'fetchTruckMenu/request',
        'fetchTruckMenu/success',
        'fetchTruckMenu/failure'
    )<number, ITruckPropertiesResult<IFoodTruckMenuItem>, AxiosError>(),

    fetchTruckSchedule: createAsyncAction(
        'fetchTruckSchedule/request',
        'fetchTruckSchedule/success',
        'fetchTruckSchedule/failure'
    )<number, ITruckPropertiesResult<IFoodTruckScheduleEntry>, AxiosError>(),

    selectTruck: createAction('selectTruck',
        resolve => (id: number | null) => resolve(id)
    ),

    searchTrucks: createAction('searchTrucks',
        resolve => (searchTerm: string) => resolve(searchTerm)
    ),

    sortTrucks: createAction('sortTrucks',
        resolve => (sortName: string, sortDirection: SortDirection) => resolve({ sortName, sortDirection })
    ),

    setTruckPage: createAction('setTruckPage',
        resolve => (page: number) => resolve(page)
    ),

    setTruckPageSize: createAction('setTruckPageSize',
        resolve => (pageSize: number) => resolve(pageSize)
    ),

    deleteSelectedTruck: {
        request: createAction('deleteTruck/request'),
        confirm: createAction('deleteTruck/confirm'),
        cancel: createAction('deleteTruck/cancel'),
    },

    postDeleteTruck: createAsyncAction(
        'postDeleteTruck/request',
        'postDeleteTruck/success',
        'postDeleteTruck/error'
    )<number, void, AxiosError>(),
};

export type RootAction = ActionType<typeof actions>;
