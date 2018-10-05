import { ActionType, createAction } from 'typesafe-actions';

import { IFoodTruck, IFoodTruckMenuItem } from '../../models';

export const actions =
{
    setTruck: createAction('truckDetails/setTruck', resolve => {
        return (truck: IFoodTruck | null) => resolve(truck);
    }),

    setMenuItems: createAction('truckDetails/setMenuItems', resolve => {
        return (items: ReadonlyArray<IFoodTruckMenuItem>) => resolve(items);
    }),
};

export type TruckDetailsAction = ActionType<typeof actions>;
