import { connect } from 'react-redux';

import { DetailsPanel } from '../../components/TruckDetails/DetailsPanel';
import { getSelectedTruck, RootState } from '../../store';

const mapStateToProps = (state: RootState) => ({
    truck: getSelectedTruck(state),
});

const DetailPanelContainer = connect(mapStateToProps)(DetailsPanel);
export { DetailPanelContainer };
