import '@bootstrap-css';

import React from 'react';
import { ListGroup } from 'react-bootstrap';

import { IFoodTruck } from '../../models';
import { ListItem } from './ListItem';

export interface IListBodyProps
{
    readonly trucks: ReadonlyArray<IFoodTruck>;
    readonly selectedId: number | null;
    readonly selectTruck: (id: number) => void;
}

const ListBody = ({ trucks, selectedId, selectTruck }: IListBodyProps) =>
{
    const items = trucks.map(truck =>
    {
        const isSelected = truck.id === selectedId;

        return <ListItem key={truck.id} truck={truck} selected={isSelected} selectTruck={selectTruck} />;
    });

    return <ListGroup>{items}</ListGroup>;
};

export { ListBody };
