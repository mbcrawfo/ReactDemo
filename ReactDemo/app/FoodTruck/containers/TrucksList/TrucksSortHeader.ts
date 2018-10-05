import { SortHeader } from '@app/components/SortHeader';
import { SortDirection } from '@app/SortDirection';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { RootState } from '../../store';
import { actions } from '../../store/trucksList';

interface IOwnProps
{
    readonly sortName: string;
}

const mapStateToProps = (state: RootState, { sortName }: IOwnProps) => ({
    sort: state.trucksList.request.sortName === sortName
        ? state.trucksList.request.sortDirection
        : null,
});

const mapDispatchToProps = (dispatch: Dispatch, { sortName }: IOwnProps) => ({
    setSort: (sortDirection: SortDirection) =>
    {
        dispatch(actions.setSort(sortName, sortDirection));
    },
});

const TrucksSortHeader = connect(mapStateToProps, mapDispatchToProps)(SortHeader);
export { TrucksSortHeader };
