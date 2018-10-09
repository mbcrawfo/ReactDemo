import { SortHeader } from '@app/components/SortHeader';
import { SortDirection } from '@app/SortDirection';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { actions, RootState } from '../../store';

interface IOwnProps
{
    readonly sortName: string;
}

const getSortDirection = (state: RootState, componentSortName: string) =>
{
    const { truckRequestParams: { sortDirection, sortName } } = state;

    if (sortName !== componentSortName)
    {
        return null;
    }

    return sortDirection;
};

const mapStateToProps = (state: RootState, { sortName }: IOwnProps) => ({
    sort: getSortDirection(state, sortName),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    setSort: actions.sortTrucks,
}, dispatch);

const mergeProps = (
    { sort, ...stateProps }: ReturnType<typeof mapStateToProps>,
    { setSort, ...dispatchProps }: ReturnType<typeof mapDispatchToProps>,
    { sortName, ...ownProps }: IOwnProps
) =>
({
    ...ownProps,
    sortName,
    ...dispatchProps,
    setSort: (sortDirection: SortDirection) => setSort(sortName, sortDirection),
    sort,
    ...stateProps,
});

const SortHeaderContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(SortHeader);
export { SortHeaderContainer };
