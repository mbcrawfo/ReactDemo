import { connect } from 'react-redux';

import { DetailsContent } from '../../components/TruckDetails/DetailsContent';
import { RootState } from '../../store';

const mapStateToProps = (state: RootState) => ({
    truckSelected: state.selectedTruckId !== null,
    menuLoading: state.truckMenusLoading,
});

const DetailsContentContainer = connect(mapStateToProps)(DetailsContent);
export { DetailsContentContainer };
