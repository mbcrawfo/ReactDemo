import { combineEpics } from 'redux-observable';

import { FoodTruckApi } from '../api';
import { entitiesEpics } from './entities';
import { trucksEpics } from './trucksList';

export interface IEpicServices
{
    readonly api: FoodTruckApi;
}

export const rootEpic = combineEpics(
    ...entitiesEpics,
    ...trucksEpics
);
