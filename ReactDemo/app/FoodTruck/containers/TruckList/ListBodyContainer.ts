import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ListBody } from '../../components/TruckList/ListBody';
import { actions, getSortedVisibleTrucks, RootState } from '../../store';

const mapStateToProps = (state: RootState) => ({
    trucks: getSortedVisibleTrucks(state),
    selectedId: state.selectedTruckId,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    selectTruck: actions.selectTruck,
}, dispatch);

const ListBodyContainer = connect(mapStateToProps, mapDispatchToProps)(ListBody);
export { ListBodyContainer };
