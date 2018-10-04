import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ListBody } from '../../components/TrucksList/ListBody';
import { RootState } from '../../store';
import { actions } from '../../store/Trucks';

const mapStateToProps = (state: RootState) => ({
    trucks: state.foodTrucks.response.currentPage,
    selectedId: state.foodTrucks.selectedTruckId,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    selectTruck: actions.select,
}, dispatch);

const TrucksListBody = connect(mapStateToProps, mapDispatchToProps)(ListBody);
export { TrucksListBody };
