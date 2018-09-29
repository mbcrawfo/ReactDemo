import '@bootstrap-css';

import { FilterButton } from '@app/TodoList/containers/FilterButton';
import { VisibilityFilter } from '@app/TodoList/state';
import React from 'react';

const Footer = () => (
    <div className="btn-group">
        <FilterButton filter={VisibilityFilter.All}>
            All
        </FilterButton>
        <FilterButton filter={VisibilityFilter.Active}>
            Active
        </FilterButton>
        <FilterButton filter={VisibilityFilter.Completed}>
            Completed
        </FilterButton>
    </div>
);

export { Footer };
