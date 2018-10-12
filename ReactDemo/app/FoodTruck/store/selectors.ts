import { createSelector } from 'reselect';

import { DefaultConfirmationModalData, IConfimationModalData } from '../../modules/ConfirmationModal';
import { actions } from './actions';
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

export const getSelectedTruckSchedule = (state: RootState) =>
{
    const { entities: { truckSchedules }, selectedTruckId } = state;

    if (!selectedTruckId)
    {
        return null;
    }

    return truckSchedules[selectedTruckId] || null;
};

export const getConfirmationModalState = (state: RootState) => state.confirmationModal;

export const getDeleteConfirmationModalData = (state: RootState): IConfimationModalData =>
{
    const truck = getSelectedTruck(state);
    if (!truck)
    {
        return DefaultConfirmationModalData;
    }

    const { id, name } = truck;

    return {
        title: 'Delete Food Truck?',
        text: `Are you sure you want to delete '${name}'?`,
        acceptAction: actions.deleteTruck.confirm(id),
        cancelAction: actions.deleteTruck.cancel(id),
    };
};
