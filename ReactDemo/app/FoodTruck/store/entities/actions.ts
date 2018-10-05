import { AxiosError } from 'axios';
import { ActionType, createAsyncAction } from 'typesafe-actions';

import { IFetchTruckRequest, IPagedData } from '../../api';
import { IFoodTruck, IFoodTruckMenuItem } from '../../models';

interface IFetchTruckMenuResponse
{
    readonly foodTruckId: number;
    readonly menuItems: ReadonlyArray<IFoodTruckMenuItem>;
}

export const actions = {
    fetchTrucks: createAsyncAction(
        'fetchTrucks/request',
        'fetchTrucks/success',
        'fetchTrucks/failure'
    )<IFetchTruckRequest, IPagedData<IFoodTruck>, AxiosError>(),

    fetchTruckMenu: createAsyncAction(
        'fetchTruckMenu/request',
        'fetchTruckMenu/success',
        'fetchTruckMenu/failure'
    )<number, IFetchTruckMenuResponse, AxiosError>(),
};

export type EntitiesAction = ActionType<typeof actions>;
