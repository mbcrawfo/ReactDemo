import { IFoodTruck, IPagedData, ITruckRequest } from '@app/FoodTruck/state';
import SortDirection from '@app/SortDirection';
import { createAction, createAsyncAction } from 'typesafe-actions';

export const fetchTrucks = createAsyncAction(
    'trucks/fetch/request',
    'trucks/fetch/success',
    'trucks/fetch/failure'
)<ITruckRequest, IPagedData<IFoodTruck>, Response>();

export const setSelectedTruck = createAction('trucks/select', resolve => {
    return (id: number | null) => resolve(id);
});

export const setTruckSort = createAction('trucks/sort', resolve => {
    return (sortDirection: SortDirection, sortName: ITruckRequest['sortName']) => resolve({ sortDirection, sortName });
});

export const setTruckSearch = createAction('trucks/search', resolve => {
    return (term: string) => resolve(term);
});

export const setTruckPage = createAction('trucks/page', resolve => {
    return (page: number) => resolve(page);
});
