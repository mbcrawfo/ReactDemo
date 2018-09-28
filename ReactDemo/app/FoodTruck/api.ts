import { IFoodTruck, IPagedData, ITruckRequest } from '@app/FoodTruck/state';
import { mapKeysToCamelCase } from '@app/utilities';

export interface IFoodTruckApiRoutes
{
    readonly getTrucks: string;
}

export class FoodTruckApi
{
    constructor(readonly routes: IFoodTruckApiRoutes)
    {
    }

    public readonly fetchTrucks = ({page, pageSize, sortDirection, sortName, searchTerm}: ITruckRequest) =>
    {
        let url = `${this.routes.getTrucks}?page=${page}&pageSize=${pageSize}`;
        url = `${url}&sortDirection=${sortDirection}&sortName=${sortName}`;

        if (searchTerm)
        {
            url = `${url}&searchTerm=${searchTerm}`;
        }

        return this.fetchJson<IPagedData<IFoodTruck>>(url);
    }

    private readonly fetchJson = async <T>(url: string) =>
    {
        const response = await fetch(url);
        const data = await response.json();
        return mapKeysToCamelCase(data) as T;
    }
}
