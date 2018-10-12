import SortDirection from '@app/SortDirection';
import { AxiosError } from 'axios';
import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';

import { ConfirmationModalAction } from '../../reusable-containers/ConfirmationModal';
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

    deleteTruck:
    {
        begin: createAction('deleteTruck/begin',
            resolve => (truckId: number) => resolve(truckId)),

        confirm: createAction('deleteTruck/confirm',
            resolve => (truckId: number) => resolve(truckId)
        ),

        cancel: createAction('deleteTruck/cancel',
            resolve => (truckId: number) => resolve(truckId)
        ),

        commit: createAsyncAction(
            'deleteTruck/commit/request',
            'deleteTruck/commit/success',
            'deleteTruck/commit/error'
        )<number, number, AxiosError>(),
    },
};

export type RootAction = ActionType<typeof actions> | ConfirmationModalAction;
