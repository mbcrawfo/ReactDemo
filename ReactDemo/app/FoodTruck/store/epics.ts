import { combineEpics } from 'redux-observable';

import { FoodTruckApi } from '../api';
import { trucksEpics } from './Trucks';

export interface IEpicServices
{
    readonly api: FoodTruckApi;
}

export const rootEpic = combineEpics(
    ...trucksEpics
);
