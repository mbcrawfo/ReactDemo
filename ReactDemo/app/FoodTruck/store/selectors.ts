import { createSelector } from 'reselect';

import { RootState } from './reducers';

export const getSortedVisibleTrucks = createSelector(
    (state: RootState) => state.entities.trucks,
    (state: RootState) => state.truckPaging.sortedTruckIds,
    (trucks, ids) => ids.map(id => trucks[id])
);

export const getSelectedTruck = (state: RootState) =>
{
    const { entities: { trucks }, selectedTruckId } = state;

    if (!selectedTruckId)
    {
        return null;
    }

    return trucks[selectedTruckId] || null;
};

export const getSelectedTruckMenu = (state: RootState) =>
{
    const { entities: { truckMenus }, selectedTruckId } = state;

    if (!selectedTruckId)
    {
        return null;
    }

    return truckMenus[selectedTruckId] || null;
};
