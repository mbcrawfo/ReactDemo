import { ActionType } from 'typesafe-actions';

import { IFetchTruckRequest, IPagedData } from '../api';
import { IFoodTruck } from '../types';
import * as actions from './actions';

export type TruckListAction = ActionType<typeof actions>;

export interface ITruckListState
{
    readonly isLoading: boolean;
    readonly selectedTruckId: number | null;
    readonly request: IFetchTruckRequest;
    readonly response: IPagedData<IFoodTruck>;
    readonly errorMessage: string;
}
