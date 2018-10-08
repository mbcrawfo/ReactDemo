import '@bootstrap-css';

import React from 'react';
import { ListGroup } from 'react-bootstrap';

import { IFoodTruckMenuItem } from '../../models';
import { MenuItem } from './MenuItem';

export interface IMenuCategoryProps
{
    readonly name: string;
    readonly menuItems: ReadonlyArray<IFoodTruckMenuItem>;
}

const MenuCategory = ({ name, menuItems }: IMenuCategoryProps) =>
{
    const listGroupItems = menuItems.map(item =>
    {
        const key = `${item.category}-${item.name}`;
        return <MenuItem key={key} menuItem={item} />;
    });

    return (
        <React.Fragment>
            <h4>{name}</h4>
            <ListGroup>
                {listGroupItems}
            </ListGroup>
        </React.Fragment>
    );
};

export { MenuCategory };
