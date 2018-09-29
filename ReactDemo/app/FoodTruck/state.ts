import SortDirection from '@app/SortDirection';

export interface ITruckRequest
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

export interface IFoodTruck
{
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly rating: number;
}

export interface IFoodTruckState
{
    readonly truckList:
    {
        readonly isLoading: boolean;
        readonly request: ITruckRequest;
        readonly selectedTruckId: number | null;
    };

    readonly data:
    {
        readonly trucks: IPagedData<IFoodTruck>;
    };
}
