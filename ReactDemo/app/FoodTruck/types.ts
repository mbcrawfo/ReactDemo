import { TruckDetailsAction } from './TruckDetails';
import { ITruckListState, TruckListAction } from './TruckList';

export type RootAction = TruckListAction | TruckDetailsAction;

export interface IFoodTruck
{
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly rating: number;
}

export interface IFoodTruckMenuItem
{
    readonly foodTruckId: number;
    readonly name: string;
    readonly description: string;
    readonly price: number;
}

export interface IFoodTruckAppState
{
    readonly truckList: ITruckListState;

    readonly data:
    {
        readonly foodTrucks: ReadonlyArray<IFoodTruck>;
        readonly menuItems: ReadonlyMap<number, ReadonlyArray<IFoodTruckMenuItem>>;
    };
}
