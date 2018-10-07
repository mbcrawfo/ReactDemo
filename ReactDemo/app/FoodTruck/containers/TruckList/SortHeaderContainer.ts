import { SortHeader } from '@app/components/SortHeader';
import { SortDirection } from '@app/SortDirection';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { actions, RootState } from '../../store';

interface IOwnProps
{
    readonly sortName: string;
}

const mapStateToProps = (state: RootState, { sortName }: IOwnProps) => ({
    sort: state.truckRequestParams.sortName === sortName
        ? state.truckRequestParams.sortDirection
        : null,
});

const mapDispatchToProps = (dispatch: Dispatch, { sortName }: IOwnProps) => ({
    setSort: (sortDirection: SortDirection) =>
    {
        dispatch(actions.sortTrucks(sortName, sortDirection));
    },
});

const SortHeaderContainer = connect(mapStateToProps, mapDispatchToProps)(SortHeader);
export { SortHeaderContainer };
