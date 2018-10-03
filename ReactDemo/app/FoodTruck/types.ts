import { ITruckListState, TruckListAction } from './TruckList';

export type RootAction = TruckListAction;

export interface IFoodTruck
{
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly rating: number;
}

export interface IFoodTruckAppState
{
    readonly truckList: ITruckListState;

    readonly data:
    {
        readonly foodTrucks: ReadonlyArray<IFoodTruck>;
    };
}
