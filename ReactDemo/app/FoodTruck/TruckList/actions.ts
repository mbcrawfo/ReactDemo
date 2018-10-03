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

export const setSelectedTruck = createAction('trucks/select', resolve => {
    return (id: number | null) => resolve(id);
});

export const setTruckSort = createAction('trucks/sort', resolve => {
    return (sortDirection: SortDirection, sortName: IFetchTruckRequest['sortName']) =>
        resolve({ sortDirection, sortName });
});

export const setTruckSearch = createAction('trucks/search', resolve => {
    return (term: string) => resolve(term);
});

export const setTruckPage = createAction('trucks/page', resolve => {
    return (page: number) => resolve(page);
});
