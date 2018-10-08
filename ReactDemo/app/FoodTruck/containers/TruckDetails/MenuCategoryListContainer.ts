import { sortBy } from 'lodash';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { MenuCategoryList } from '../../components/TruckDetails/MenuCategoryList';
import { IFoodTruckMenuItem } from '../../models';
import { getSelectedTruckMenu, RootState } from '../../store';

interface ICategoryMap
{
    [key: string]: IFoodTruckMenuItem[];
}

const getGroupedAndOrderedMenuItems = createSelector(
    getSelectedTruckMenu,
    menuItems =>
    {
        const categoryMap = (menuItems || []).reduce((map, item) =>
        {
            const { category } = item;
            map[category] = map[category] || [];
            map[category].push(item);
            return map;
        }, {} as ICategoryMap);

        const nameSelector = (i: IFoodTruckMenuItem) => i.name;
        for (const name of Object.getOwnPropertyNames(categoryMap))
        {
            categoryMap[name] = sortBy(categoryMap[name], nameSelector);
        }

        return {
            categories: Object.getOwnPropertyNames(categoryMap).sort(),
            menuItemsByCategory: categoryMap,
        };
    }
);

const mapStateToProps = (state: RootState) => ({
    ...getGroupedAndOrderedMenuItems(state),
});

const MenuCategoryListContainer = connect(mapStateToProps)(MenuCategoryList);
export { MenuCategoryListContainer };
