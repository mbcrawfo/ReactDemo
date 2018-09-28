import React from 'react';
import { ListGroup } from 'react-bootstrap';

import { IFoodTruck } from '@app/FoodTruck/state';
import { TruckListItem } from '@app/FoodTruck/components/TruckListItem';

export interface ITruckListProps
{
    readonly trucks: ReadonlyArray<IFoodTruck>;
    readonly selectedId: number | null;
    readonly onTruckClick: (id: number) => void;
}

export const TruckList = ({ trucks, selectedId, onTruckClick }: ITruckListProps) =>
{
    const items = trucks.map(truck =>
    {
        const isSelected = selectedId === truck.id;

        return (
            <TruckListItem
                key={truck.id}
                name={truck.name}
                rating={truck.rating}
                selected={isSelected}
                onClick={() => onTruckClick(truck.id)}
            />
        );
    });

    return (
        <ListGroup>
            {items}
        </ListGroup>
    );
};
