import '@bootstrap-css';

import React from 'react';
import { ListGroup } from 'react-bootstrap';

import { IFoodTruck } from '../../types';
import { TruckListItem } from './TruckListItem';

export interface ITruckListBodyProps
{
    readonly trucks: ReadonlyArray<IFoodTruck>;
    readonly selectedId: number | null;
    readonly onTruckClick: (id: number) => void;
}

const TruckListBody = ({ trucks, selectedId, onTruckClick }: ITruckListBodyProps) =>
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

    return <ListGroup>{items}</ListGroup>;
};

export { TruckListBody };
