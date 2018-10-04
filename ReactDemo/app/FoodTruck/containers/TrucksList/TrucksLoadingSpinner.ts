import { LoadingSpinner } from '@app/components/LoadingSpinner';
import { connect } from 'react-redux';

import { RootState } from '../../store';

const mapStateToProps = (state: RootState) => ({
    show: state.foodTrucks.loading,
});

const TrucksLoadingSpinner = connect(mapStateToProps)(LoadingSpinner);
export { TrucksLoadingSpinner };
