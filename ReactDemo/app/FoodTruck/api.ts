import SortDirection from '@app/SortDirection';
import axios from 'axios';

import { IRouteTable } from '../routes';
import { IFoodTruck, IFoodTruckMenuItem, IFoodTruckScheduleEntry } from './models';

export interface IFetchTruckRequest
{
    readonly searchTerm: string;
    readonly sortDirection: SortDirection;
    readonly sortName: string;
    readonly page: number;
    readonly pageSize: number;
}

export interface IPagedData<T>
{
    readonly totalItems: number;
    readonly filteredItems: number;
    readonly currentPage: ReadonlyArray<T>;
}

export class FoodTruckApi
{
    constructor(private readonly routes: IRouteTable)
    {
    }

    public readonly fetchTrucks = async (request: IFetchTruckRequest) =>
    {
        const { getFoodTrucks } = this.routes;
        const response = await axios.get(getFoodTrucks, { params: { ...request } });
        return response.data as IPagedData<IFoodTruck>;
    }

    public readonly fetchTruckMenu = async (foodTruckId: number) =>
    {
        const { getFoodTruckMenu } = this.routes;
        const response = await axios.get(getFoodTruckMenu, { params: { foodTruckId } });
        return response.data as IFoodTruckMenuItem[];
    }

    public readonly fetchTruckSchedule = async (foodTruckId: number) =>
    {
        const { getFoodTruckSchedule } = this.routes;
        const response = await axios.get(getFoodTruckSchedule, { params: { foodTruckId } });
        return response.data as IFoodTruckScheduleEntry[];
    }

    public readonly deleteTruck = async (foodTruckId: number) =>
    {
        const { deleteFoodTruck } = this.routes;
        await axios.post(deleteFoodTruck, { foodTruckId });
    }
}
