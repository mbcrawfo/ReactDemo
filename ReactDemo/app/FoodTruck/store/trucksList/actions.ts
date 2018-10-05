import SortDirection from '@app/SortDirection';
import { ActionType, createAction } from 'typesafe-actions';

export const actions =
{
    select: createAction('trucksList/select', resolve => {
        return (id: number | null) => resolve(id);
    }),

    setSort: createAction('trucksList/setSort', resolve => {
        return (sortName: string, sortDirection: SortDirection) =>
            resolve({ sortName, sortDirection });
    }),

    setSearch: createAction('trucksList/setSearch', resolve => {
        return (searchTerm: string) => resolve(searchTerm);
    }),

    setPage: createAction('trucksList/setPage', resolve => {
        return (page: number) => resolve(page);
    }),

    setPageSize: createAction('trucksList/setPageSize', resolve => {
        return (pageSize: number) => resolve(pageSize);
    }),
};

export type TrucksListAction = ActionType<typeof actions>;
