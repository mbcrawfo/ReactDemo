import '@bootstrap-css';

import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

import { IFoodTruckMenuItem } from '../../models';

export interface IMenuItemProps
{
    readonly menuItem: IFoodTruckMenuItem;
}

const MenuItem = ({ menuItem: { name, description, price } }: IMenuItemProps) =>
{
    const header = (
        <React.Fragment>
            <strong>{name}</strong>
            <span className="pull-right">${price.toFixed(2)}</span>
        </React.Fragment>
    );

    return (
        <ListGroupItem header={header}>
            <p>{description}</p>
        </ListGroupItem>
    );
};

export { MenuItem };
