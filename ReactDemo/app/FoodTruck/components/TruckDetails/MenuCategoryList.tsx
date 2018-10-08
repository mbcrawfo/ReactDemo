import '@bootstrap-css';

import React from 'react';

import { IFoodTruckMenuItem } from '../../models';
import { MenuCategory } from './MenuCategory';

export interface IMenuCategoryListProps
{
    readonly categories: ReadonlyArray<string>;
    readonly menuItemsByCategory:
    {
        readonly [key: string]: ReadonlyArray<IFoodTruckMenuItem>;
    };
}

const MenuCategoryList = ({ categories, menuItemsByCategory }: IMenuCategoryListProps) =>
{
    const categoryListItems = categories.map(category =>
        <MenuCategory key={category} name={category} menuItems={menuItemsByCategory[category]} />);

    return (
        <ul className="list-unstyled">
            {categoryListItems}
        </ul>
    );
};

export { MenuCategoryList };
