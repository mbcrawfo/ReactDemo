import SortDirection from '@app/SortDirection';
import { AxiosError } from 'axios';
import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';

import { IFetchTruckRequest, IPagedData } from '../api';
import { IFoodTruck, IFoodTruckMenuItem } from '../models';

interface IFetchTruckMenuPayload
{
    readonly foodTruckId: number;
    readonly menuItems: ReadonlyArray<IFoodTruckMenuItem>;
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
    )<number, IFetchTruckMenuPayload, AxiosError>(),

    selectTruck: createAction('selectTruck', resolve => {
        return (id: number | null) => resolve(id);
    }),

    searchTrucks: createAction('searchTrucks', resolve => {
        return (searchTerm: string) => resolve(searchTerm);
    }),

    sortTrucks: createAction('sortTrucks', resolve => {
        return (sortName: string, sortDirection: SortDirection) =>
            resolve({ sortName, sortDirection });
    }),

    setTruckPage: createAction('setTruckPage', resolve => {
        return (page: number) => resolve(page);
    }),

    setTruckPageSize: createAction('setTruckPageSize', resolve => {
        return (pageSize: number) => resolve(pageSize);
    }),
};

export type RootAction = ActionType<typeof actions>;
