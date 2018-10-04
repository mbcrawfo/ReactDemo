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
