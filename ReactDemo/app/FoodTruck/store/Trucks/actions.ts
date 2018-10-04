import SortDirection from '@app/SortDirection';
import { AxiosError } from 'axios';
import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';

import { IFetchTruckRequest, IPagedData } from '../../api';
import { IFoodTruck } from '../../models';

export const actions =
{
    fetch: createAsyncAction(
        'trucks/fetch/request',
        'trucks/fetch/success',
        'trucks/fetch/failure'
    )<IFetchTruckRequest, IPagedData<IFoodTruck>, AxiosError>(),

    select: createAction('trucks/select', resolve => {
        return (id: number | null) => resolve(id);
    }),

    setSort: createAction('trucks/setSort', resolve => {
        return (sortName: string, sortDirection: SortDirection) =>
            resolve({ sortName, sortDirection });
    }),

    setSearch: createAction('trucks/setSearch', resolve => {
        return (searchTerm: string) => resolve(searchTerm);
    }),

    setPage: createAction('trucks/setPage', resolve => {
        return (page: number) => resolve(page);
    }),

    setPageSize: createAction('trucks/setPageSize', resolve => {
        return (pageSize: number) => resolve(pageSize);
    }),
};

export type TrucksAction = ActionType<typeof actions>;
