import SortDirection from '@app/SortDirection';
import { mapKeysToCamelCase } from '@app/utilities';
import axios from 'axios';

import { IFoodTruck } from './types';

export interface IFoodTruckApiRoutes
{
    readonly getTrucks: string;
}

export interface IFetchTruckRequest
{
    readonly searchTerm: string;
    readonly sortDirection: SortDirection;
    readonly sortName: 'name' | 'rating';
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
    constructor(private readonly routes: IFoodTruckApiRoutes)
    {
    }

    public readonly fetchTrucks = async (request: IFetchTruckRequest) =>
    {
        const response = await axios.get(this.routes.getTrucks, { params: { ...request } });
        return mapKeysToCamelCase(response.data) as IPagedData<IFoodTruck>;
    }
}
