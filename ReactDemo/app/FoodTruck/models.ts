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
    readonly category: string;
    readonly name: string;
    readonly description: string;
    readonly price: number;
}

export interface IFoodTruckScheduleEntry
{
    readonly foodTruckId: number;
    readonly locationName: string;
    readonly address: string;
    readonly start: string;
    readonly end: string;
}
