import { AxiosError } from 'axios';
import { createAction, createAsyncAction } from 'typesafe-actions';

import { IFoodTruckMenuItem } from '../types';

interface IFetchMenuData
{
    readonly foodTruckId: number;
    readonly menuItems: ReadonlyArray<IFoodTruckMenuItem>;
}

export const fetchMenu = createAsyncAction(
    'truckMenu/request',
    'truckMenu/success',
    'truckMenu/failure'
)<number, IFetchMenuData, AxiosError>();

export const setMenuData = createAction('truckMenu/setData', resolve => {
    return (data: ReadonlyArray<IFoodTruckMenuItem>) => resolve(data);
});
