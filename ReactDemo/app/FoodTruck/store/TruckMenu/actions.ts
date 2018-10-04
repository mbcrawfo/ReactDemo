import { AxiosError } from 'axios';
import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';

import { IFoodTruckMenuItem } from '../../models';

interface IFetchMenuData
{
    readonly foodTruckId: number;
    readonly menuItems: ReadonlyArray<IFoodTruckMenuItem>;
}

export const actions =
{
    fetch: createAsyncAction(
        'truckMenu/fetch/request',
        'truckMenu/fetch/success',
        'truckMenu/fetch/failure'
    )<number, IFetchMenuData, AxiosError>(),

    setData: createAction('truckMenu/setData', resolve => {
        return (data: ReadonlyArray<IFoodTruckMenuItem>) => resolve(data);
    }),
};

export type TruckMenuAction = ActionType<typeof actions>;
