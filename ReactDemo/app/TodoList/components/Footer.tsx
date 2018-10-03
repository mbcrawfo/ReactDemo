import '@bootstrap-css';

import React from 'react';

import { FilterButton } from '../containers/FilterButton';
import { VisibilityFilter } from '../types';

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
