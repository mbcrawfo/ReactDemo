import { connect } from 'react-redux';

import { DetailsPanel } from '../../components/TruckDetails/DetailsPanel';
import { RootState } from '../../store';

const mapStateToProps = (state: RootState) => ({
    truck: state.truckDetails.truck,
});

const DetailPanelContainer = connect(mapStateToProps)(DetailsPanel);
export { DetailPanelContainer };
