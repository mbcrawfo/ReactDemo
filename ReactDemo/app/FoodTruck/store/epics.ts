import { combineEpics } from 'redux-observable';

import { FoodTruckApi } from '../api';
import { entitiesEpics } from './entities';
import { truckDetailsEpics } from './truckDetails';
import { trucksListEpics } from './trucksList';

export interface IEpicServices
{
    readonly api: FoodTruckApi;
}

export const rootEpic = combineEpics(
    ...trucksListEpics,
    ...truckDetailsEpics,
    ...entitiesEpics
);
