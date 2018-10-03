import SortDirection from '@app/SortDirection';
import { AxiosError } from 'axios';
import { createAction, createAsyncAction } from 'typesafe-actions';

import { IFetchTruckRequest, IPagedData } from '../api';
import { IFoodTruck } from '../types';

export const fetchTrucks = createAsyncAction(
    'trucks/fetch/request',
    'trucks/fetch/success',
    'trucks/fetch/failure'
)<IFetchTruckRequest, IPagedData<IFoodTruck>, AxiosError>();

export const selectTruck = createAction('trucks/select', resolve => {
    return (id: number | null) => resolve(id);
});

export const setSort = createAction('trucks/sort', resolve => {
    return (sortDirection: SortDirection, sortName: IFetchTruckRequest['sortName']) =>
        resolve({ sortDirection, sortName });
});

export const setSearch = createAction('trucks/search', resolve => {
    return (term: string) => resolve(term);
});

export const setPage = createAction('trucks/page', resolve => {
    return (page: number) => resolve(page);
});
