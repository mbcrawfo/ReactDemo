import { LoadingSpinner } from '@app/components/LoadingSpinner';
import { connect } from 'react-redux';

import { RootState } from '../../store';

const mapStateToProps = (state: RootState) => ({
    show: state.trucksList.loading,
});

const LoadingSpinnerContainer = connect(mapStateToProps)(LoadingSpinner);
export { LoadingSpinnerContainer };
