import moment from 'moment';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { ScheduleList } from '../../components/TruckDetails/ScheduleList';
import { getSelectedTruckSchedule, RootState } from '../../store';

const getSortedSchedule = createSelector(
    getSelectedTruckSchedule,
    entries => [...(entries || [])].sort((a, b) => moment(b.start).valueOf() - moment(a.start).valueOf())
);

const mapStateToProps = (state: RootState) => ({
    entries: getSortedSchedule(state),
});

const ScheduleListContainer = connect(mapStateToProps)(ScheduleList);
export { ScheduleListContainer };
