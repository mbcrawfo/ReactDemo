import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ListBody } from '../../components/TrucksList/ListBody';
import { RootState } from '../../store';
import { actions } from '../../store/trucksList';

const mapStateToProps = (state: RootState) => ({
    trucks: state.trucksList.response.currentPage,
    selectedId: state.trucksList.selectedTruckId,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    selectTruck: actions.select,
}, dispatch);

const TrucksListBody = connect(mapStateToProps, mapDispatchToProps)(ListBody);
export { TrucksListBody };
