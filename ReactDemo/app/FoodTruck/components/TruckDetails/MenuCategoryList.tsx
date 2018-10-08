import '@bootstrap-css';

import React from 'react';

import { IFoodTruckMenuItem } from '../../models';
import { MenuCategory } from './MenuCategory';

export interface ICategoryMap
{
    readonly [key: string]: ReadonlyArray<IFoodTruckMenuItem>;
}

export interface IMenuCategoryListProps
{
    readonly categories: ReadonlyArray<string>;
    readonly categoryMenuItems: ICategoryMap;
}

const MenuCategoryList = ({ categories, categoryMenuItems }: IMenuCategoryListProps) =>
{
    const categoryListItems = categories.map(category =>
        <MenuCategory key={category} name={category} menuItems={categoryMenuItems[category]} />);

    return (
        <ul className="list-unstyled">
            {categoryListItems}
        </ul>
    );
};

export { MenuCategoryList };
