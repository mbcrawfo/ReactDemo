import { IFoodTruck, IPagedData, ITruckRequest } from '@app/FoodTruck/state';
import { mapKeysToCamelCase } from '@app/utilities';
import axios from 'axios';

export interface IFoodTruckApiRoutes
{
    readonly getTrucks: string;
}

export class FoodTruckApi
{
    constructor(private readonly routes: IFoodTruckApiRoutes)
    {
    }

    public readonly fetchTrucks = async (request: ITruckRequest) =>
    {
        const response = await axios.get(this.routes.getTrucks, { params: { ...request } });
        return mapKeysToCamelCase(response.data) as IPagedData<IFoodTruck>;
    }
}
