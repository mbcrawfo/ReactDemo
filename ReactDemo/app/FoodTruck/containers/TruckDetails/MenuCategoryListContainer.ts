import { sortBy } from 'lodash';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { MenuCategoryList } from '../../components/TruckDetails/MenuCategoryList';
import { IFoodTruckMenuItem } from '../../models';
import { getSelectedTruckMenu, RootState } from '../../store';

interface IMutableCategoryMap
{
    [key: string]: IFoodTruckMenuItem[];
}

const getGroupedAndOrderedMenuItems = createSelector(
    getSelectedTruckMenu,
    menuItems =>
    {
        const categories = new Set<string>();
        const categoryGroups = (menuItems || []).reduce((map, item) =>
        {
            const { category } = item;
            if (!map[category])
            {
                map[category] = [];
            }

            categories.add(category);
            map[category].push(item);

            return map;
        }, {} as IMutableCategoryMap);

        const nameSelector = (i: IFoodTruckMenuItem) => i.name;
        categories.forEach(category =>
        {
            const items = categoryGroups[category];
            categoryGroups[category] = sortBy(items, [nameSelector]);
        });

        return {
            categories: Array.from(categories).sort(),
            categoryMenuItems: categoryGroups,
        };
    }
);

const mapStateToProps = (state: RootState) => ({
    ...getGroupedAndOrderedMenuItems(state),
});

const MenuCategoryListContainer = connect(mapStateToProps)(MenuCategoryList);
export { MenuCategoryListContainer };
